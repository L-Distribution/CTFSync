import React from 'react'

import css from "./styles/header.scss"
import MenuIcon from "./icons/material-icons/menu.svg"

function Header() {
  return (<>
    <header className={css.header}>
      <MenuIcon className={css.menuIcon}/>
      <div className={css.siteName}>CTFSync</div>
    </header>

  </>)
}

export default Header;
