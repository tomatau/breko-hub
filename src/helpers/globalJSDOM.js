import { JSDOM } from 'jsdom'
import { keys } from 'ramda'

global.jsdom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <div id="application-root"></div>
    </body>
  </html>
`, { url: 'http://localhost:3210/' })

const { window } = global.jsdom
const { document } = window

global.window = window
global.document = document

keys(document).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document[property]
  }
})

global.navigator = { userAgent: 'node.js' }
