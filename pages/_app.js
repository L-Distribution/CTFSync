import React from 'react';
import App, { Container } from 'next/app';

import {ThemeProvider} from "@rmwc/theme";

import "../components/styles/global.scss"
import '@material/theme/dist/mdc.theme.css'

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider
        options={{
          primary: '#2adaff',
          secondary: '#00e99e',
          onPrimary: 'rgba(0, 0, 0, 0.95)',
          textPrimaryOnBackground: 'white'
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