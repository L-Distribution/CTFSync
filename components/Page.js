import React from "react";

import Footer from "./Footer";

import css from "./styles/authedPage.scss";

function Page(props) {
  return (
    <>
      <div>{props.children}</div>
      <Footer />
    </>
  );
}

export default Page;
