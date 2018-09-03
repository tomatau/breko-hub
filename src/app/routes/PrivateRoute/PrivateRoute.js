import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import { privateRoute as privateRouteCopy } from 'app/copy'
import { addMessage } from 'app/modules/flash/flash.actions'

@connect(null, { replace, addMessage })
class PrivateRoute extends React.Component {
  constructor(props) {
    const { addMessage, replace } = props
    addMessage(privateRouteCopy.flasgMessage, 'error')
    replace('/')
    super(props)
  }

  render() {
    return (
      <section className='PrivateRoute'>
        <DocumentMeta>
          <title>{privateRouteCopy.documentTitle}</title>
        </DocumentMeta>
        {privateRouteCopy.content}
      </section>
    )
  }
}

export default hot(module)(PrivateRoute)
