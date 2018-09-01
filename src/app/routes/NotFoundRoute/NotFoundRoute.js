import React from 'react'
import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import { notFoundRoute } from 'app/copy'

class NotFoundRoute extends React.Component {
  render() {
    return (
      <section className='NotFoundRoute'>
        <DocumentMeta>
          <title>{notFoundRoute.title}</title>
        </DocumentMeta>
        {notFoundRoute.content}
      </section>
    )
  }
}

export default hot(module)(NotFoundRoute)
