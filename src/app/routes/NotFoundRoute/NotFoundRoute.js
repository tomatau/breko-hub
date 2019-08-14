import React from 'react'
import DocumentMeta from 'react-helmet'
import { notFoundRoute as notFoundRouteCopy } from 'app/copy'

export default class NotFoundRoute extends React.Component {
  render() {
    return (
      <>
        <DocumentMeta>
          <title>{notFoundRouteCopy.documentTitle}</title>
        </DocumentMeta>
        <section className='NotFoundRoute'>
          {notFoundRouteCopy.content}
        </section>
      </>
    )
  }
}
