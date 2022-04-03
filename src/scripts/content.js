import React from 'react'
import ReactDOM from 'react-dom/client'
import browser from 'webextension-polyfill'

// import { onMessage } from 'webext-bridge' // Messaging in WebExtension made super easy. Out of the box.

import { App } from '../pages/Content'

const DEBUG = false

console.info('EXTENSION: Action -- Content.js Loaded')
const renderApp = (params) => {
  const container = document.createElement('div') // create a container for the app to render into.
  container.setAttribute('id', 'content-root') // Give it an id to find it later.
  container.style.zIndex = 98765000 // Set some styles.
  const root = document.createElement('div') // Create a root element that lives inside the shadowDOM. This gives us a unique namespace(?) to work with.

  const shadowDOM =
    container.attachShadow?.({ mode: DEBUG ? 'open' : 'closed' }) || container

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('src/styles/global.css'))
  shadowDOM.appendChild(styleEl)

  const toastStyle = document.createElement('link')
  toastStyle.setAttribute('rel', 'stylesheet')
  toastStyle.setAttribute(
    'href',
    'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
  )
  document.head.appendChild(toastStyle) // This needs to be slotted into the DOM head, not the shadowDOM element. Toasty.

  const toaster = document.createElement('script')
  toaster.setAttribute('src', 'https://cdn.jsdelivr.net/npm/toastify-js')
  shadowDOM.appendChild(toaster)

  shadowDOM.appendChild(root)
  document.documentElement.appendChild(container) // Stick the container into the DOM. In this case, we'll choose the body.
  // document.body.appendChild(container) // Stick the container into the DOM. In this case, we'll choose the body.

  // React Rendering
  const rootBox = ReactDOM.createRoot(root) // React 18 and up, we're required to use ReactDOM.createRoot() to create a root element instead of ReactDOM.render() so this is how you do it.

  rootBox.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

renderApp()
