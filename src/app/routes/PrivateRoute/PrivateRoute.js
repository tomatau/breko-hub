import React from 'react'
import { Helmet as DocumentMeta } from 'react-helmet-async'
import { privateRoute as privateRouteCopy } from 'app/copy'

export default function PrivateRoute() {
  return (
    <>
      <DocumentMeta>
        <title>{privateRouteCopy.documentTitle}</title>
      </DocumentMeta>
      <section className='PrivateRoute'>
        {privateRouteCopy.content}
      </section>
    </>
  )
}
