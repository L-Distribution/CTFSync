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

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.scrapeChals = functions.firestore.document('/ctfs/{ctfId}').onCreate(async (snap, context) => {
  const ctf = snap.data();

  if (ctf.dataFetched) return null

  const scraper = new CTFdScraper(ctf.url)
  scraper.authenticate({
    "cookie": "censored"
  })

  let chals = await scraper.getChals()
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

  const chalCollection = snap.ref.collection('chals')

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

  return snap.ref.set({ dataFetched: true }, {merge: true})
});