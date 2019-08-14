import React from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'
import DocumentMeta from 'react-helmet'
import { privateRoute as privateRouteCopy } from 'app/copy'
import { addMessage } from 'app/modules/flash/flash.actions'

@connect(null, { replace, addMessage })
export default class PrivateRoute extends React.Component {
  constructor(props) {
    const { addMessage, replace } = props
    addMessage(privateRouteCopy.flasgMessage, 'error')
    replace('/')
    super(props)
  }

  render() {
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
}
