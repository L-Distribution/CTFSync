import React from 'react'

import Link from 'next/link'

import AuthedPage from "../components/AuthedPage";

function Page() {
  return <>
    <AuthedPage>
      <div>Welcome to other page!</div>
      <Link>
        <a href={"/"}>back lol</a>
      </Link>
    </AuthedPage>
  </>
}

export default Page;
