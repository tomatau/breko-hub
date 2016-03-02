import { jsdom } from 'jsdom'
import { keys } from 'lodash'

global.document = jsdom(
  `<html><body><div id="application-root"></div></body></html>`
)
global.window = document.defaultView
keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

global.navigator = { userAgent: 'node.js' }
