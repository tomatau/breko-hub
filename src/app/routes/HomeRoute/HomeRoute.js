import React from 'react'
import { Helmet as DocumentMeta } from 'react-helmet-async'
import { homeRoute as homeRouteCopy } from 'app/copy'

export default class HomeRoute extends React.Component {
  render() {
    return (
      <>
        <DocumentMeta>
          <title />
        </DocumentMeta>
        <section className='HomeRoute'>
          {homeRouteCopy.content}
        </section>
      </>
    )
  }
}
