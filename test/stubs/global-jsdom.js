import 'raf/polyfill'
import { JSDOM } from 'jsdom'
import { keys } from 'ramda'
import { CONTAINER_ELEMENT_ID } from 'config/constants'

global.jsdom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <div id="${CONTAINER_ELEMENT_ID}"></div>
    </body>
  </html>
`, { url: 'http://localhost:3210/' })

const { window } = global.jsdom
const { document } = window

global.window = window
global.document = document
global.HTMLElement = window.HTMLElement

keys(document).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document[property]
  }
})

global.navigator = { userAgent: 'node.js' }
