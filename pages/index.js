import React from "react";

import AuthedPage from "../components/AuthedPage";
import Link from "next/link";

function Home() {
  return (
    <>
      <AuthedPage>
        <div>Welcome to first page!</div>
        <Link href={"/home"}>
          <a>/home</a>
        </Link>
        <Link href={"/login"}>
          <a>/login</a>
        </Link>
        <Link href={"/challenges"}>
          <a>/challenges</a>
        </Link>
        <Link href={"/page"}>
          <a>/page</a>
        </Link>
      </AuthedPage>
    </>
  );
}

export default Home;
