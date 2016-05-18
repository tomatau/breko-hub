import ReactDOMServer from 'react-dom/server'
import { Html } from 'server/components/Html'

export default function makeHtml(initialState, assets, content) {
  return `<!doctype html>${ReactDOMServer.renderToString(
    <Html
      initialState={initialState}
      headScripts={assets.headScripts}
      bodyScripts={assets.bodyScripts}
      headStyles={assets.headStyles}
      bodyStyles={assets.bodyStyles}
      children={content}
    />
  )}`
}
