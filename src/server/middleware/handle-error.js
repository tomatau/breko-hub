import React from 'react'
import { RedBoxError } from 'redbox-react'
import ReactDOMServer from 'react-dom/server'
import { set } from 'lodash'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import { isEnv } from 'app/utils'
import makeHtmlBody from 'server/utils/make-html-body'

const log = debug('handle-error')

export default async function handleError(ctx, next) {
  try {
    await next()
    set(ctx, 'session.state', null)
  } catch (err) {
    log(err)
    const __html = ReactDOMServer.renderToStaticMarkup(
      isEnv('development') ? <RedBoxError error={err} /> : <ServerOops />
    )

    ctx.status = 500
    ctx.response.body = makeHtmlBody({
      content: [ {
        id: CONTAINER_ELEMENT_ID,
        dangerouslySetInnerHTML: { __html },
      } ],
    })
  }
}

const ServerOops = () => (
  <div className='ServerOops'>
    Oopsies! Broke&quot;o-hub :(
  </div>
)
