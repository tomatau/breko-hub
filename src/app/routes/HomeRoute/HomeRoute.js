import React from 'react'
import DocumentMeta from 'react-helmet'
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
