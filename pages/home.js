import React from "react";

import Page from "../components/Page";
import Link from "next/link";

import css from "../components/styles/home.scss";

function Index() {
  return (
    <>
      <Page>
        <div className={css.homeWrap}>
          <div className={css.siteName}>CTFSync</div>
          <img src="/static/images/flag.png" alt="flag logo" />
          <div>Solve challenges, share your solutions, one place.</div>
          <Link href="/challenges">
            <div className={css.gSignInButton}>
              <div className={css.contentWrapper}>
                <div className={css.logoWrapper}>
                  <img src="/static/images/g-logo.png"  alt={"Google logo"}/>
                </div>
                <span className={css.textContainer}>
                  <span>Sign in with Google</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </Page>
    </>
  );
}

export default Index;
