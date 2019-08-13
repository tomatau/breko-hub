import React from 'react'
import DocumentMeta from 'react-helmet'
import { oopsRoute as oopsRouteCopy } from 'app/copy'

export default class OopsRoute extends React.Component {
  render() {
    return (
      <section className='OopsRoute'>
        <DocumentMeta>
          <title>{oopsRouteCopy.documentTitle}</title>
        </DocumentMeta>
        {oopsRouteCopy.content}
      </section>
    )
  }
}
