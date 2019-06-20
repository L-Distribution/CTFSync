import React from 'react'
import ReactMarkdown from 'react-markdown'

import {ThemeProvider} from "@rmwc/theme"
import { Button } from "@rmwc/button"
import {Dialog, DialogTitle, DialogActions, DialogButton, DialogContent} from "@rmwc/dialog"

import '@material/dialog/dist/mdc.dialog.css'
import '@material/button/dist/mdc.button.css'

import css from "./styles/challenge.scss"

function Challenge(props) {
  const [detailsOpen, setDetailsOpen] = React.useState(false)

  const claimed = props.chal.claimedBy ? <h3 className={css.claimedBy}>
    {["Claimed by", ...props.chal.claimedBy.map((x, i) => i === props.chal.claimedBy.length - 1 ? x : (x + (i < props.chal.claimedBy.length - 2 ? "," : (props.chal.claimedBy.length === 2 ? " and" : ", and"))))].join(" ")}
  </h3> : <></>

  const netcat = props.chal.netcat ? (<>
    <h3>Netcat</h3>
    <pre>nc {props.chal.netcat.host} {props.chal.netcat.port}</pre>
  </>) : <></>

  return (<>
    <Dialog
      open={detailsOpen}
      onClose={() => {
        setDetailsOpen(false);
      }}
    >
      <DialogTitle theme={["primary", "onSurface"]}>{props.chal.name}</DialogTitle>
      <DialogContent theme={["primary", "onSurface"]}>
        {netcat}
      </DialogContent>
      <DialogActions>
        <DialogButton action="close">Cancel</DialogButton>
        <DialogButton action="accept" isDefaultAction>
          Download
        </DialogButton>
      </DialogActions>
    </Dialog>

    <div className={css.chalCard}>
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
        <Button raised theme={['secondaryBg', 'onSecondary']} ripple={{accent: true}} onClick={() => {setDetailsOpen(true)}}>Details</Button>
        <Button raised ripple={{accent: true}}>Claim</Button>
      </div>
    </div>
  </>)
}

export default Challenge
