import React from 'react'
import PropTypes from 'prop-types'

const reactElementsPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])

export default class Html extends React.Component {
  static propTypes = {
    headLinks: PropTypes.arrayOf(PropTypes.object), // e.g. favicons
    headStyles: PropTypes.arrayOf(PropTypes.string), // <link>s for head styles
    inlineScripts: PropTypes.arrayOf(PropTypes.string), // e.g. window.__STATE__
    headScripts: PropTypes.arrayOf(PropTypes.string), // e.g. js before app
    headElements: reactElementsPropType, // react elements for head
    bodyDivs: PropTypes.arrayOf(PropTypes.object), // divs of body
    bodyElements: reactElementsPropType, // react elements for body
    deferredScripts: PropTypes.arrayOf(PropTypes.string), // non vital js
    deferredStyles: PropTypes.arrayOf(PropTypes.string), // async css
  };

  static defaultProps = {
    helmetContext: {},
    headLinks: [],
    headStyles: [],
    inlineScripts: [],
    headScripts: [],
    headElements: [],
    bodyDivs: [],
    bodyElements: [],
    deferredScripts: [],
    deferredStyles: [],
  };

  render() {
    const {
      headLinks,
      headStyles,
      inlineScripts,
      headScripts,
      headElements,
      bodyDivs,
      bodyElements,
      deferredScripts,
      deferredStyles,
      helmetContext,
    } = this.props
    // const helmet = Helmet.renderStatic()
    const { helmet } = helmetContext
    const { lang, ...htmlAttrs } = helmet.htmlAttributes.toComponent()
    return (
      <html lang={lang} {...htmlAttrs}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {headLinks.map((props, i) => (
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
          {inlineScripts.map((script, i) => (
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
          {headElements}
        </head>
        <body {...helmet.bodyAttributes.toComponent()}>
          {bodyDivs.map((props, i) => (
            <div key={i} {...props} />
          ))}
          {bodyElements}
          {deferredScripts.map((script, i) => (
            <script key={i} src={script} />
          ))}
          {deferredStyles.map((style, i) => (
            <script
              key={i}
              dangerouslySetInnerHTML={{
                __html: `loadCSS('${style}')`,
              }}
            />
          ))}
          {deferredStyles.map((style, i) => (
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
