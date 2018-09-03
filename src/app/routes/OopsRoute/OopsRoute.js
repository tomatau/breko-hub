import React from 'react'
import { hot } from 'react-hot-loader'
import DocumentMeta from 'react-helmet'
import { oopsRoute as oopsRouteCopy } from 'app/copy'

class OopsRoute extends React.Component {
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

export default hot(module)(OopsRoute)
