import React from "react";

import Head from "next/head";
import Link from "next/link";
import { Drawer, DrawerHeader, DrawerTitle, DrawerContent } from "@rmwc/drawer";
import { List, ListItem } from "@rmwc/list";
import { Button } from "@rmwc/button";
import { IconButton } from "@rmwc/icon-button";
import { CircularProgress } from "@rmwc/circular-progress";

import "@material/drawer/dist/mdc.drawer.css";
import "@material/list/dist/mdc.list.css";
import "@material/button/dist/mdc.button.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "@rmwc/circular-progress/circular-progress.css";

import css from "./styles/authedPage.scss";
import MenuIcon from "./icons/material-icons/menu.svg";
import AddIcon from "./icons/material-icons/add.svg";

import firebase from "firebase";
import "firebase/firestore";

function AuthedPage(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [db] = React.useState(firebase.firestore());
  const [ctfs, setCTFs] = React.useState([]);

  React.useEffect(() => {
    db.collection("ctfs").onSnapshot(snapshot => {
      let res = [];

      snapshot.forEach(doc => {
        res.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setCTFs(res);
    });
  }, []);

  const ctfList = ctfs.map((c, i) => (
    <Link as={`/ctf/${c.id}`} as={`/ctf/${c.id}`} href={`/ctf?id=${c.id}`} key={c.id}>
      <a>
        <ListItem key={i} className={css.ctfListItem}>
          <p>{c.name}</p>
          {c.dataFetched ? <></> : <CircularProgress />}
        </ListItem>
      </a>
    </Link>
  ));

  return (
    <>
      <Drawer modal open={drawerOpen} onClose={() => setDrawerOpen(false)} theme={["surface"]}>
        <DrawerHeader>
          <DrawerTitle>CTFSync</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <Button
            label={"Add CTF"}
            icon={<AddIcon />}
            onClick={() => {
              db.collection("ctfs")
                .add({
                  name: "HSCTF 2019",
                  url: "https://ctf.hsctf.com",
                  dataFetched: false
                })
                .then(docRef => {
                  console.log(docRef.id);
                })
                .catch(e => {
                  console.log(e);
                });
            }}
          />
          <List>{ctfList}</List>
        </DrawerContent>
      </Drawer>

      <Head>
        <title>yay a title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <header className={css.header}>
        <IconButton
          className={css.menuIcon}
          icon={<MenuIcon />}
          label="Open menu"
          onClick={() => setDrawerOpen(true)}
        />
        <Link href="/">
          <div className={css.siteName}>CTFSync</div>
        </Link>
      </header>
      <div className={css.pageContent}>{props.children}</div>
    </>
  );
}
export default AuthedPage;
