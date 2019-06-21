import React from 'react'

import Head from 'next/head'
import Link from 'next/link'
import {Drawer, DrawerHeader, DrawerTitle, DrawerContent} from '@rmwc/drawer'
import {List, ListItem} from '@rmwc/list'
import {IconButton} from '@rmwc/icon-button'

import '@material/drawer/dist/mdc.drawer.css'
import '@material/list/dist/mdc.list.css'
import '@material/icon-button/dist/mdc.icon-button.css';

import css from "./styles/authedPage.scss"
import MenuIcon from "./icons/material-icons/menu.svg";

function AuthedPage(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  console.log(props)

  return (<>
    <Drawer modal open={drawerOpen} onClose={() => setDrawerOpen(false)} theme={["surface"]}>
      <DrawerHeader>
        <DrawerTitle>CTFSync</DrawerTitle>
      </DrawerHeader>
      <DrawerContent>
        <List>
          <ListItem>HSCTF 2019</ListItem>
        </List>
      </DrawerContent>
    </Drawer>

    <Head>
      <title>yay a title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <header className={css.header}>
      <IconButton className={css.menuIcon} icon={<MenuIcon/>} label="Open menu" onClick={() => setDrawerOpen(true)} />
      <Link href="/">
        <div className={css.siteName}>CTFSync</div>
      </Link>
    </header>
    <div className={css.pageContent}>
      {props.children}
    </div>
  </>)
}

export default AuthedPage
