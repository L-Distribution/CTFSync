import React from "react";
import App, { Container } from "next/app";

import { ThemeProvider } from "@rmwc/theme";
import "normalize.css";

import firebase from 'firebase'

import "styles/global.scss";
import "@material/theme/dist/mdc.theme.css";

class CustomApp extends App {
  constructor () {
    super();

    const firebaseConfig = {
      apiKey: "AIzaSyDSI1FPM8ePwo-kJHcNCl034KVLj55YBd8",
      authDomain: "ctf-sync.firebaseapp.com",
      databaseURL: "https://ctf-sync.firebaseio.com",
      projectId: "ctf-sync",
      storageBucket: "ctf-sync.appspot.com",
      messagingSenderId: "752216929934",
      appId: "1:752216929934:web:7480e990d39c873f"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = Object.assign({}, pageProps, await Component.getInitialProps(ctx));
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider
        options={{
          primary: "#2adaff",
          primaryBg: "#2adaff",
          secondary: "#00e99e",
          secondaryBg: "#00e99e",
          onPrimary: "rgba(0, 0, 0, 0.95)",
          onSurface: "#ffffff",
          textPrimaryOnBackground: "white",
          textDisabledOnBackground: "green",
          background: "#121212",
          surface: "#121212"
        }}
      >
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default CustomApp;
