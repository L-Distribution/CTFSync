import {Dialog, DialogActions, DialogButton, DialogContent} from "@rmwc/dialog";
import css from "./styles/addDialog.scss";
import {TextField} from "@rmwc/textfield";
import React from "react";
import {Button} from "@rmwc/button";
import AddIcon from "./icons/material-icons/add.svg";
import firebase from "firebase";
import {CircularProgress} from "@rmwc/circular-progress";

export default function () {
    const [addOpen, setAddOpen] = React.useState(false)
    const [authOpen, setAuthOpen] = React.useState(false)
    const [spinnerOpen, setSpinnerOpen] = React.useState(false)
    const [spinnerText, setSpinnerText] = React.useState("")
    const [ctfDocument, setCTFDocument] = React.useState(null)
    const [db] = React.useState(firebase.firestore())
    const [name, setName] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [cookie, setCookie] = React.useState("");

    React.useEffect(() => {
        console.log(ctfDocument)
        if (ctfDocument) {
            ctfDocument.onSnapshot(snap => {
                const data = snap.data()
                if (data.dataFetched === "authNeeded" && !data.auth) {
                    setSpinnerOpen(false)
                    setAuthOpen(true)
                } else if (data.dataFetched === "authGood") {
                    setSpinnerText("Fetching...")
                } else if (data.dataFetched === true) {
                    setSpinnerOpen(false)
                    setAuthOpen(false)
                }
            })
        }
    }, [ctfDocument]);

    return (<>
        <Button label={"Add CTF"} icon={<AddIcon/>} onClick={() => setAddOpen(true)}/>

        <Dialog
            open={addOpen}
            onClose={() => {
                setAddOpen(false);
            }}
        >
            <DialogContent theme={["onSurface"]} className={css.dialogWrapper}>
                <TextField
                    outlined
                    label="Name"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <TextField
                    outlined
                    label="URL"
                    value={url}
                    onChange={e => {
                        setUrl(e.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <DialogButton action="close">Cancel</DialogButton>
                <DialogButton action="accept" isDefaultAction onClick={() => {
                    setSpinnerOpen(true)
                    setSpinnerText("Authenticating...")
                    db.collection("ctfs").add({
                        name: name,
                        url: url,
                        dataFetched: false
                    }).then(docRef => {
                        setCTFDocument(docRef)
                    }).catch(e => {
                        console.log(e)
                    })
                }}>Done</DialogButton>
            </DialogActions>
        </Dialog>

        <Dialog
            open={spinnerOpen}
            onClose={() => {
                setAddOpen(false);
            }}
        >
            <DialogContent theme={["onSurface"]} className={css.dialogWrapper}>
                <CircularProgress />
                <p>{spinnerText}</p>
            </DialogContent>
        </Dialog>

        <Dialog
            open={authOpen}
            onClose={() => {
                setAuthOpen(false);
            }}
        >
            <DialogContent theme={["onSurface"]} className={css.dialogWrapper}>
                <TextField
                    outlined
                    label="Cookie"
                    value={cookie}
                    onChange={e => {
                        setCookie(e.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <DialogButton action="close" onClick={() => {
                    ctfDocument.delete()
                }}>Cancel</DialogButton>
                <DialogButton action="accept" isDefaultAction onClick={() => {
                    setSpinnerOpen(true)
                    setSpinnerText("Fetching...")
                    ctfDocument.update({
                        auth: {cookie}
                    }).catch(e => {
                        console.log(e)
                    })
                }}>Done</DialogButton>
            </DialogActions>
        </Dialog>
    </>)
}