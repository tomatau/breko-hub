import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import { errorReducers as error } from './errorReducers'
import { flashReducers as flash } from './flashReducers'

export default combineReducers({
  error,
  flash,
  routing: routeReducer,
})
