import React from "react";

import css from "./styles/authedPage.scss";

function Page(props) {
  return (
    <>
      <div>{props.children}</div>
    </>
  );
}

export default Page;
