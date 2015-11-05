import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Html } from '~/src/server/components/Html'
import { makeContent } from '~/src/app/utils/makeContent'

function makeHtml(initialState, assets, content) {
  return ReactDOMServer.renderToString(
    <Html
      title={'Breko Hub'}
      initialState={initialState}
      headScripts={[ assets.javascript.head ]}
      bodyScripts={[ assets.javascript.body ]}
      headStyles={[ assets.styles.body ]}
      bodyStyles={[]}
    >
      {content}
    </Html>
  )
}

export default function(assets) {
  return function *(next) {
    const { routeContext, store } = this
    const html = makeHtml(
      store.getState(),
      assets,
      makeContent(routeContext, store)
    )
    this.response.body = `<!doctype html>${html}`
  }
}
