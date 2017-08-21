import { RedBoxError } from 'redbox-react'
import ReactDOMServer from 'react-dom/server'
import { set } from 'lodash'
import { isEnv } from 'app/utils'
import makeHtmlBody from 'server/utils/makeHtmlBody'

const log = debug('handle-error')

export default async function handleError(ctx, next) {
  try {
    await next()
    set(ctx, 'session.state', null)
  } catch (err) {
    log(err)
    ctx.status = 500
    ctx.response.body = makeHtmlBody({
      content: [
        {
          id: 'app-container',
          dangerouslySetInnerHTML: {
            __html: ReactDOMServer.renderToStaticMarkup(
              isEnv('development') ? <RedBoxError error={err} /> : <ServerOops />
            ),
          },
        },
      ],
    })
  }
}

const ServerOops = () => (
  <div className='ServerOops'>
    Oopsies! Broke'o-hub :(
  </div>
)
