import React from 'react'

import Link from 'next/link'
import { withRouter } from 'next/router'

import AuthedPage from "../components/AuthedPage";
import Challenge from "../components/Challenge"

import css from "./styles/ctf.scss"
import firebase from "firebase";

function CTF(props) {
  const [db] = React.useState(firebase.firestore())
  const [chals, setChals] = React.useState([])

  React.useEffect(() => {
    db.collection('ctfs').doc(props.router.query.ctf).collection('chals').onSnapshot(snapshot => {
      let res = []

      snapshot.forEach(doc => {
        res.push(doc.data())
      })

      setChals(res)
    })
  }, [props.router.query.ctf])

  return <>
    <AuthedPage>
      <div className={css.chals}>
        {chals.map((chal, i) => <Challenge chal={chal} key={i}/>)}
      </div>
    </AuthedPage>
  </>
}

export default withRouter(CTF);
