import React from 'react'
import { RedBoxError } from 'redbox-react'
import ReactDOMServer from 'react-dom/server'
import { set } from 'lodash'
import { HelmetProvider } from 'react-helmet-async'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import { isEnv } from 'app/utils'
import makeHtmlBody from 'server/utils/make-html-body'

import Server500 from 'server/components/Server500'

const log = debug('handle-error')

// would prefer to use error-overlay but SSR and hot-reload breaks it
export default async function handleError(ctx, next) {
  try {
    await next()
    set(ctx, 'session.state', null)
  } catch (err) {
    log(err)
    const helmetContext = {}
    const __html = ReactDOMServer.renderToStaticMarkup(
      <HelmetProvider context={helmetContext}>
        {isEnv('development') ? <RedBoxError error={err} /> : <Server500 />}
      </HelmetProvider>
    )

    ctx.status = 500
    ctx.response.body = makeHtmlBody({
      helmetContext,
      bodyDivs: [ {
        id: CONTAINER_ELEMENT_ID,
        dangerouslySetInnerHTML: { __html },
      } ],
    })
  }
}
