import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { flashReducers as flash } from './flash.reducers'
import { barReducers as bar } from './bar.reducers'

export default combineReducers({
  flash,
  bar,
  routing: routerReducer,
})
