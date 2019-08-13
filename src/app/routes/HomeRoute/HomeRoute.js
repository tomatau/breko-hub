import React from 'react'
import DocumentMeta from 'react-helmet'
import { homeRoute as homeRouteCopy } from 'app/copy'

export default class HomeRoute extends React.Component {
  render() {
    return (
      <section className='HomeRoute'>
        <DocumentMeta>
          <title />
        </DocumentMeta>
        {homeRouteCopy.content}
      </section>
    )
  }
}
