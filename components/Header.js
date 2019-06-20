import React from "react";

import Link from "next/link";

import css from "./styles/header.scss";
import MenuIcon from "./icons/material-icons/menu.svg";

function Header() {
  return (
    <>
      <header className={css.header}>
        <MenuIcon className={css.menuIcon} />
        <Link href="/">
          <div className={css.siteName}>CTFSync</div>
        </Link>
      </header>
    </>
  );
}

export default Header;
