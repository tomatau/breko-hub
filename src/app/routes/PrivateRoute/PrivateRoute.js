import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { replace } from 'connected-react-router'
import { privateRoute as privateRouteCopy } from 'app/copy'
import { addMessage } from 'app/modules/flash/flash.actions'

function PrivateRoute(props) {
  useEffect(() => {
    props.addMessage(privateRouteCopy.flasgMessage, 'error')
  })
  return (
    <Redirect to='/' />
  )
}

export default connect(null, { replace, addMessage })(PrivateRoute)
