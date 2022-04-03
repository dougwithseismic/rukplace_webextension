import browser from 'webextension-polyfill'

console.info('EXTENSION: Action -- background.js Loaded')

browser.runtime.onInstalled.addListener(() => {
  // eslint-disable-next-line no-console
  console.log(
    'Extension installed - THIS HAPPENS ONLY ONCE WHEN USER FIRST INSTALLS EXTENSION',
  )
})

// write a browser listener to listen for a new message from the popup window
browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const { ACTION } = request

  switch (ACTION) {
    case 'OPEN_LINK':
      const { URL } = request
      try {
        await doTheThing(URL) // Wait for the tab logic to complete...
        console.log('"Done and dusted" :>> ', "Done and dusted");

        return Promise.resolve({ response: 'complete' })
      } catch (error) {
        console.log('Error: ', error)
        return Promise.reject(error)
      }

    default:
      console.log('Message received: ', request)
      break
  }

  console.log('request', request)
  console.log('sender', sender)
})


const doTheThing = async (url) => {
  // 1. Create the new tab
  // 2. Switch back to the original ASAP
  // 3. When the new tab is loaded, cookie drops so close it.
  // Sorted!

}

const until = async (condition) => {
  // This waits until the condition is true, then resolves. We can wait for the tab to the loaded. I think.
  const poll = async (resolve) => {
    let isTrue = await condition()
    if (isTrue) {
      resolve()
    } else {
      console.log('Waiting...', isTrue)
      setTimeout(() => poll(resolve), 400)
    }
  }
  return new Promise(poll)
}
