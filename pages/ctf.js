import React from 'react'

import Link from 'next/link'
import { withRouter } from 'next/router'

import {CircularProgress} from '@rmwc/circular-progress'

import AuthedPage from "../components/AuthedPage";
import Challenge from "../components/Challenge"

import '@rmwc/circular-progress/circular-progress.css';

import css from "./styles/ctf.scss"
import firebase from "firebase";

function CTF(props) {
  const [db] = React.useState(firebase.firestore())
  const [dataFetched, setDataFetched] = React.useState([])
  const [chals, setChals] = React.useState([])

  React.useEffect(() => {
    db.collection('ctfs').doc(props.router.query.id).onSnapshot(snapshot => {
      setDataFetched(snapshot.get('dataFetched'))
    })

    db.collection('ctfs').doc(props.router.query.id).collection('chals').onSnapshot(snapshot => {
      let res = []

      snapshot.forEach(doc => {
        res.push(doc.data())
      })

      setChals(res)
    })
  }, [props.router.query.id])

  return <>
    <AuthedPage>
      {dataFetched ?
        <div className={css.chals}>
          {chals.map((chal, i) => <Challenge chal={chal} key={i}/>)}
        </div>
      : <CircularProgress/>}
    </AuthedPage>
  </>
}

export default withRouter(CTF);
