import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Html from 'server/components/Html'

const makeHtmlBody = (props) =>
  `<!doctype html>${
    ReactDOMServer.renderToStaticMarkup(<Html {...props} />)
  }`

export default makeHtmlBody
