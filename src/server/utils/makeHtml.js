import ReactDOMServer from 'react-dom/server'
import Html from 'server/components/Html'

export default function makeHtml(assets, content) {
  return `<!doctype html>${
    ReactDOMServer.renderToStaticMarkup(
      <Html {...assets} content={content} />
    )
  }`
}
