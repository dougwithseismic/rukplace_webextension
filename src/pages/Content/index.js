import React, { useState, useEffect, Suspense } from 'react'
import browser from 'webextension-polyfill'

import '../../styles/global.css'
import initBot from '../../scripts/unionflag'

export const App = () => {
  const [loaded, setLoaded] = useState(false)
  const [show, setShow] = useState(true)

  const onClick = async () => {
    browser.runtime
      .sendMessage({
        ACTION: 'OPEN_LINK',
      })
      .then((res) => console.log('success', res))
      .catch((err) => console.error('fail', err))
  }

  return (
    <div
      className="rounded-full py-2 px-4 fixed top-4 right-4 border-2 border-[#f5f5f5] shadow-sm bg-black text-white"
      style={{ zIndex: 98765000, display: show ? 'block' : 'none' }}
      onClick={() => setShow(false)}
    >
      <h3 className="embed-title text-lg font-bold" onClick={() => initBot()}>
        r/UKplace - Click to start
      </h3>
    </div>
  )
}
