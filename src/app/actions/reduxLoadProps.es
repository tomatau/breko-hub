import { store } from '~/src/app/state/store'

const reduxLoadProps = (action, cb) => {
  store.dispatch((dispatch, getState) => {
    dispatch(action)
    cb(getState())
  })
}

export default reduxLoadProps
