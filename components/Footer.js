import React from "react";

import Link from "next/link";

import css from "./styles/footer.scss";
import LogoIcon from "../static/svg/ldistlong.svg";

import { Button } from "@rmwc/button";
import "@material/button/dist/mdc.button.css";

import { ThemeProvider } from "@rmwc/theme";

import TextField, { Input } from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";

function Footer() {
  return (
    <>
      <footer className={css.footer}>
        <img src="/static/images/flag.png" alt="flag logo" className={css.flagLogo} />
        <div>
          <Link href="/">Home</Link>
          <Link href="/">Profile</Link>
          <Link href="/">About</Link>
          <Link href="/">Challenges</Link>
          <Link href="/">Team</Link>
          <Link href="/">Privacy</Link>
        </div>
        <div>
          <div>Contact Us</div>
          <div>
            <a href="mailto:info@ldistribution.com" className={css.mail}>
              info@ldistribution.com
            </a>
          </div>
          <div>
            <a href="mailto:info@ldistribution.com" className={css.phone}>
              420-352-2169
            </a>
          </div>
          <div>
            <a href="mailto:info@ldistribution.com" className={css.location}>
              123456 Random Address
            </a>
          </div>
        </div>
        <div>
          <div>Stay Updated</div>
          <TextField
            label="Email"
            theme={["secondaryBg", "onSecondary"]}
            outlined
            floatingLabelClassName={css.emailInput}
          >
            <Input theme={["secondaryBg", "onSecondary"]} />
          </TextField>
          <Button raised theme={["secondaryBg", "onSecondary"]} ripple={{ accent: true }}>
            Subscribe
          </Button>
        </div>
      </footer>
      <footer className={css.footerBottom}>
        <div className={css.siteName}>CTFSync</div>
        <div className={css.logoWrap}>
          <div>Created with ❤ by</div>
          <a href="https://github.com/L-Distribution" target="_blank" rel="noopener noreferrer">
            <LogoIcon className={css.logoIcon} />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
