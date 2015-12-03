import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import { errorReducers as error } from './errorReducers'
import { flashReducers as flash } from './flashReducers'
import { exampleReducers as example } from './exampleReducers'

export default combineReducers({
  error,
  flash,
  example,
  routing: routeReducer,
})
