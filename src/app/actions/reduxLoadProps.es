import _ from 'lodash/index'
import { store } from '~/src/app/state/store'

const reduxLoadProps = (actions, selector) =>
  (params, cb) => {
    const initialPropState = selector(store.getState())
    if ( _.some(initialPropState, _.isEmpty) ) {
      store.dispatch((dispatch, getState) => {
        actions.forEach(action => dispatch(action))
        cb(null, selector(getState()))
      })
    } else {
      cb(null, initialPropState)
    }
  }

export default reduxLoadProps
