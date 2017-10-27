import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { flashReducers as flash } from 'app/modules/flash/flash.reducers'
import { barReducers as bar } from 'app/modules/bar/bar.reducers'

export default combineReducers({
  flash,
  bar,
  routing,
})
