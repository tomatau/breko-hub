import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { flashReducers as flash } from 'app/modules/flash/flash.reducers'
import { barReducers as bar } from 'app/modules/bar/bar.reducers'

export default history => combineReducers({
  flash,
  bar,
  router: connectRouter(history),
})
