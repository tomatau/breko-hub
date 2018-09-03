import React from 'react'
import DocumentMeta from 'react-helmet'
import { homeRoute as homeRouteCopy } from 'app/copy'
import { hot } from 'react-hot-loader'

class HomeRoute extends React.Component {
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

export default hot(module)(HomeRoute)
