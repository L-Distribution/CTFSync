const functions = require('firebase-functions');
const admin = require('firebase-admin');
const os = require('os')
const uuidv4 = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto');

const CTFdScraper = require('./scrapers/CTFdScraper')

admin.initializeApp({
  storageBucket: "ctf-sync.appspot.com"
})

const bucket = admin.storage().bucket()

function hashStream (stream) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256')
    hash.setEncoding('hex')

    stream.pipe(hash)

    stream.on('end', () => {
      hash.end()

      resolve(hash.read())
    })

    hash.on('error', reject)
  })
}

exports.scrapeChals = functions.firestore.document('/ctfs/{ctfId}').onWrite(async (change, context) => {
  const ctf = change.after.data();

  console.log(ctf.dataFetched)
  console.log(ctf.auth)
  console.log((ctf.dataFetched && ctf.dataFetched !== "authNeeded") || (ctf.dataFetched === "authNeeded" && !ctf.auth))
  if ((ctf.dataFetched && ctf.dataFetched !== "authNeeded") || (ctf.dataFetched === "authNeeded" && !ctf.auth)) return null

  const scraper = new CTFdScraper(ctf.url)
  scraper.authenticate(ctf.auth || {})

  let chals
  try {
    chals = await scraper.getChals()
  } catch (e) {
    return  change.after.ref.set({ dataFetched: "authNeeded" }, {merge: true})
  }

  chals = chals.map(c => ({
    files: c.files || [],
    description: c.description || "",
    tags: c.tags || [],
    hints: c.hints || [],
    category: c.category || "",
    value: c.value || 0,
    name: c.name || "",
    raw: c
  }))

  const chalCollection = change.after.ref.collection('chals')

  await Promise.all(chals.map(async c => {
    c.files = await Promise.all([...c.files.map(async f => {
      const tempFilePath = path.join(os.tmpdir(), uuidv4());
      const file = fs.createWriteStream(tempFilePath)

      const res = await scraper.getFile(f)
      res.pipe(file)

      const hash = await hashStream(res)

      await bucket.upload(tempFilePath, {
        destination: hash
      })

      return hash
    })])

    return chalCollection.add(c)
  }))

  return change.after.ref.set({ dataFetched: true }, {merge: true})
});