import React from 'react'
import { Helmet as DocumentMeta } from 'react-helmet-async'
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
