import React from 'react'
import DocumentMeta from 'react-helmet'
import { notFoundRoute as notFoundRouteCopy } from 'app/copy'

export default class NotFoundRoute extends React.Component {
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
