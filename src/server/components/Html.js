import DocumentMeta from 'react-document-meta'
import ReactDOMServer from 'react-dom/server'
import { hasWindow } from 'app/utils'

const { PropTypes } = React

export class Html extends React.Component {

  static propTypes = {
    initialState: PropTypes.object,
    headScripts: PropTypes.array,
    bodyScripts: PropTypes.array,
    headStyles: PropTypes.array,
  };

  static defaultProps = {
    headScripts: [],
    bodyScripts: [],
    headStyles: [],
    bodyStyles: [],
  };

  render() {
    const {
      initialState,
      headStyles, headScripts,
      bodyScripts, bodyStyles,
    } = this.props
    return (
      <html lang='en'>
        <head>
          {hasWindow() ? null : DocumentMeta.renderAsReact()}
          <link rel='icon' type='image/x-icon' href='favicon.ico' />
          {headStyles.map((style, i) =>
            <link
              href={style} key={i}
              type='text/css' rel='stylesheet' media='screen'
            />
          )}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${
                JSON.stringify(initialState, null, 2)
              };`,
            }}
          />
          {headScripts.map((script, i) =>
            <script src={script} key={i} />
          )}
        </head>
        <body>
          <div
            id='application-root'
            dangerouslySetInnerHTML={{
              __html: ::this.getDivContent(),
            }}
          />
          <div id='debug-panel-root' />
          {bodyScripts.map((script, i) =>
            <script src={script} key={i} />
          )}
          {bodyStyles.map((style, i) =>
            <script key={i}
              dangerouslySetInnerHTML={{
                __html: `loadCSS('${style}')`,
              }} />
          )}
          {bodyStyles.map((style, i) =>
            <noscript key={i} dangerouslySetInnerHTML={{
              __html: `<link href="${style}" rel="stylesheet" />`,
            }} />
          )}
        </body>
      </html>
    )
  }

  getDivContent() {
    const { children } = this.props
    return (children == null) ? null : ReactDOMServer.renderToString(children)
  }

}
