import React from 'react'
import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import { notFoundRoute as notFoundRouteCopy } from 'app/copy'

class NotFoundRoute extends React.Component {
  render() {
    return (
      <section className='NotFoundRoute'>
        <DocumentMeta>
          <title>{notFoundRouteCopy.documentTitle}</title>
        </DocumentMeta>
        {notFoundRouteCopy.content}
      </section>
    )
  }
}

export default hot(module)(NotFoundRoute)
