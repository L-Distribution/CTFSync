import React from 'react'

import Link from 'next/link'

import AuthedPage from "../components/AuthedPage";
import Challenge from "../components/Challenge"

import css from "../components/styles/challenges.scss"

function Challenges() {
  const chals = [
    {
      name: "yayy",
      value: 488,
      claimedBy: ['mr. cf12']
    },
    {
      name: "unyayy",
      value: 488,
      claimedBy: ['ebhof or smth', 'mr. cf12']
    },
    { files:
        [ {
          filename: 'problem.sage',
          url: '/files/f431b0f1830b01897a32619048e70f57/problem.sage?token=eyJ0ZWFtX2lkIjo0OCwidXNlcl9pZCI6MTE3LCJmaWxlX2lkIjo4NH0.XQoqgQ.ij_lnHqQfi_1V7KLWqbsa4xAsMg'
        } ],
      description:
        'Written by ValarDragon\r\n\r\nMultiplication is safe, right?\r\n\r\n`nc crypto.hsctf.com 8113`\r\n\r\n* Intended solution runs well under < 30 seconds on my laptop',
      tags: [],
      minimum: 100,
      id: 69,
      hints: [],
      category: 'Cryptography',
      name: 'Multiplication Service',
      solves: 10,
      decay: 300,
      initial: 500,
      value: 488,
      state: 'visible',
      type: 'dynamic',
      max_attempts: 0,
      netcat: {
        host: "crypto.hsctf.com",
        port: 8113
      }
    },
    { files:
        [
          {
            filename: 'BiteCode.class',
            url: '/files/85776fff1bc69cb5b2367fb7143a8166/BiteCode.class?token=eyJ0ZWFtX2lkIjo0OCwidXNlcl9pZCI6MTE3LCJmaWxlX2lkIjo1M30.XQoqgQ.OsstdoThP1SByL0vGs0QM_EKmKk'
          },
          {
            filename: 'problem.sage',
            url: '/files/f431b0f1830b01897a32619048e70f57/problem.sage?token=eyJ0ZWFtX2lkIjo0OCwidXNlcl9pZCI6MTE3LCJmaWxlX2lkIjo4NH0.XQoqgQ.ij_lnHqQfi_1V7KLWqbsa4xAsMg'
          }
        ],
      description:
        "Written by: ItzSomebody\r\n\r\nKeith went crazy and told me to work on the compiled form of Java instead of the source code. Unfortunately, all decompilers I've tried crash on attempting to decompile. Can you help out?",
      tags: [],
      minimum: 100,
      id: 24,
      type_data:
        { templates:
            { create: '/plugins/dynamic_challenges/assets/create.html',
              update: '/plugins/dynamic_challenges/assets/update.html',
              view: '/plugins/dynamic_challenges/assets/view.html' },
          scripts:
            { create: '/plugins/dynamic_challenges/assets/create.js',
              update: '/plugins/dynamic_challenges/assets/update.js',
              view: '/plugins/dynamic_challenges/assets/view.js' },
          id: 'dynamic',
          name: 'dynamic' },
      hints: [],
      category: 'Reversal',
      name: 'Bitecode',
      solves: 99,
      decay: 350,
      initial: 500,
      value: 372,
      state: 'visible',
      type: 'dynamic',
      max_attempts: 0,
      claimedBy: ['yang', 'ebhof', 'mr. cf12']
    }
  ]

  return <>
    <AuthedPage>
      <div className={css.chals}>
        {chals.map((chal, i) => <Challenge chal={chal} key={i}/>)}
      </div>
    </AuthedPage>
  </>
}

export default Challenges;
