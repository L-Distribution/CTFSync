import React from 'react'

import AuthedPage from "../components/AuthedPage";
import Link from "next/link";

function Home() {
  return <>
    <AuthedPage>
      <div>Welcome to first page!</div>
      <Link>
        <a href={"/page"}>there lol</a>
      </Link>
    </AuthedPage>
  </>
}

export default Home;
