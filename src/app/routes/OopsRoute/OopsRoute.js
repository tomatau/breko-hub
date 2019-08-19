import React from 'react'
import { Helmet as DocumentMeta } from 'react-helmet-async'
import { oopsRoute as oopsRouteCopy } from 'app/copy'

export default class OopsRoute extends React.Component {
  render() {
    return (
      <>
        <DocumentMeta>
          <title>{oopsRouteCopy.documentTitle}</title>
        </DocumentMeta>
        <section className='OopsRoute'>
          {oopsRouteCopy.content}
        </section>
      </>
    )
  }
}
