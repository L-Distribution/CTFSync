import React from 'react'

import Head from 'next/head'
import Header from './Header'

import css from "./styles/authedPage.scss"

function AuthedPage(props) {
  return (<>
    <Head>
      <title>yay a title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <Header/>
    <div className={css.pageContent}>
      {props.children}
    </div>
  </>)
}

export default AuthedPage
