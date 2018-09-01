import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

export default class Html extends React.Component {
  static propTypes = {
    content: PropTypes.array,
    headScripts: PropTypes.array,
    stringScripts: PropTypes.array,
    bodyScripts: PropTypes.array,
    headStyles: PropTypes.array,
    otherLinks: PropTypes.array,
  };

  static defaultProps = {
    content: [],
    headScripts: [],
    stringScripts: [],
    bodyScripts: [],
    headStyles: [],
    bodyStyles: [],
    otherLinks: [],
  };

  render() {
    const {
      content,
      otherLinks,
      stringScripts,
      headStyles,
      headScripts,
      bodyScripts,
      bodyStyles,
    } = this.props
    const helmet = Helmet.renderStatic()
    const { lang, ...htmlAttrs } = helmet.htmlAttributes.toComponent()
    return (
      <html lang={lang} {...htmlAttrs}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {otherLinks.map((props, i) => (
            <link key={i} {...props} />
          ))}
          {headStyles.map((style, i) => (
            <link
              key={i}
              href={style}
              type='text/css'
              rel='stylesheet'
              media='screen'
            />
          ))}
          {stringScripts.map((script, i) => (
            <script
              key={i}
              dangerouslySetInnerHTML={{
                __html: script,
              }}
            />
          ))}
          {headScripts.map((script, i) => (
            <script
              async={false}
              src={script}
              key={i}
            />
          ))}
        </head>
        <body {...helmet.bodyAttributes.toComponent()}>
          {content.map((props, i) => (
            <div key={i} {...props} />
          ))}
          {bodyScripts.map((script, i) => (
            <script key={i} src={script} />
          ))}
          {bodyStyles.map((style, i) => (
            <script
              key={i}
              dangerouslySetInnerHTML={{
                __html: `loadCSS('${style}')`,
              }}
            />
          ))}
          {bodyStyles.map((style, i) => (
            <noscript
              key={i}
              dangerouslySetInnerHTML={{
                __html: `<link href="${style}" rel="stylesheet" />`,
              }}
            />
          ))}
        </body>
      </html>
    )
  }
}
