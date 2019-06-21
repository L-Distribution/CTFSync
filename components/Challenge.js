import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Button } from "@rmwc/button"
import {Dialog, DialogActions, DialogButton, DialogContent} from "@rmwc/dialog"

import '@material/dialog/dist/mdc.dialog.css'
import '@material/button/dist/mdc.button.css'

import css from "./styles/challenge.scss"

import DownloadIcon from "./icons/material-icons/cloudDownload.svg"

function File(props) {
  return (<div className={css.file}>
    <h2>{props.file.filename}</h2>
    <DownloadIcon/>
  </div>)
}

function Challenge(props) {
  const [detailsOpen, setDetailsOpen] = React.useState(false)

  const claimed = props.chal.claimedBy ? <h3 className={css.claimedBy}>
    {["Claimed by", ...props.chal.claimedBy.map((x, i) => i === props.chal.claimedBy.length - 1 ? x : (x + (i < props.chal.claimedBy.length - 2 ? "," : (props.chal.claimedBy.length === 2 ? " and" : ", and"))))].join(" ")}
  </h3> : <></>

  const netcat = props.chal.netcat ? (<>
    <h3>Netcat</h3>
    <pre>nc {props.chal.netcat.host} {props.chal.netcat.port}</pre>
  </>) : <></>

  const files = props.chal.files ? (<>
    <h3>Files</h3>
    {props.chal.files.map((f, i) => <File file={f} key={i}/>)}
  </>) : <></>

  const actionButton = (props.chal.claimedBy || []).includes("yang") ?
    <Button raised ripple={{accent: true}}>Add Notes</Button> :
    <Button raised ripple={{accent: true}}>Claim</Button>

  return (<>
    <Dialog
      open={detailsOpen}
      onClose={() => {
        setDetailsOpen(false);
      }}
    >
      <DialogContent theme={["primary", "onSurface"]}>
        <div className={css.chalHeader}>
          <h1 className={css.chalName}>
            {props.chal.name}
          </h1>
          <h2 className={css.chalValue}>
            {props.chal.value}
          </h2>
        </div>
        {claimed}
        {netcat}
        {files}
      </DialogContent>
      <DialogActions>
        <DialogButton action="close">Download All</DialogButton>
        <DialogButton action="accept" isDefaultAction>Done</DialogButton>
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
        {actionButton}
      </div>
    </div>
  </>)
}

export default Challenge
