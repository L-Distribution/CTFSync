import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Button } from "@rmwc/button"
import '@material/button/dist/mdc.button.css'

import css from "./styles/challenge.scss"

function Challenge(props) {
  const claimed = props.chal.claimedBy ? <h3 className={css.claimedBy}>
    {["Claimed by", ...props.chal.claimedBy.map((x, i) => i === props.chal.claimedBy.length - 1 ? x : (x + (i < props.chal.claimedBy.length - 2 ? "," : (props.chal.claimedBy.length === 2 ? " and" : ", and"))))].join(" ")}
  </h3> : <></>

  return (<div className={css.chalCard}>
    <div className={css.chalHeader}>
      <h1 className={css.chalName}>
        {props.chal.name}
      </h1>
      <h2 className={css.chalValue}>
        {props.chal.value}
      </h2>
    </div>
    {claimed}
    <ReactMarkdown className={""} source={props.chal.description} />
    <div className={css.chalFooter}>
      <Button raised theme={['secondaryBg', 'onSecondary']} ripple={{accent: true}}>Details</Button>
      <Button raised ripple={{accent: true}}>Claim</Button>
    </div>
  </div>)
}

export default Challenge
