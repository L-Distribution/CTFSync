import React, { useState } from "react";

import Link from "next/link";

import css from "./styles/footer.scss";
import LogoIcon from "../static/svg/ldistlong.svg";

import { Button } from "@rmwc/button";
import "@material/button/dist/mdc.button.css";

import { ThemeProvider } from "@rmwc/theme";

import { TextField } from "@rmwc/textfield";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [regex, setRegex] = useState(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );
  return (
    <>
      <footer className={css.footer}>
        <img src="/static/images/flag.png" alt="flag logo" className={css.flagLogo} />
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/">
            <a>Profile</a>
          </Link>
          <Link href="/">
            <a>About</a>
          </Link>
          <Link href="/">
            <a>Challenges</a>
          </Link>
          <Link href="/">
            <a>Team</a>
          </Link>
          <Link href="/">
            <a>Privacy</a>
          </Link>
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
            theme={["primary", "textPrimaryOnBackground"]}
            outlined
            required
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />

          <Button
            raised
            theme={["secondaryBg", "onSecondary"]}
            ripple={{ accent: true }}
            onClick={() => {
              if (email != "" && regex.test(email)) {
                console.log(email);
              }
            }}
          >
            Subscribe
          </Button>
        </div>
      </footer>
      <footer className={css.footerBottom}>
        <div className={css.siteName}>CTFSync</div>
        <div className={css.logoWrap}>
          <div>Created with ❤ by</div>
          <a href="ldist.io" target="_blank" rel="noopener noreferrer">
            <LogoIcon className={css.logoIcon} />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
