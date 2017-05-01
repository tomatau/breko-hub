import { JSDOM } from 'jsdom'
import { keys } from 'ramda'

const { window } = new JSDOM(
  '<!DOCTYPE html><html><head></head><body><div id="application-root"></div></body></html>'
)
const { document } = window
global.window = window
global.document = document
keys(document).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document[property]
  }
})

global.navigator = { userAgent: 'node.js' }
