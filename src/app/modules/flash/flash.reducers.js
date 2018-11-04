import { append, propEq, evolve, reject } from 'ramda'
import { typeToReducer, get } from 'app/utils'
import { REMOVE_MESSAGE, ADD_MESSAGE } from './flash.constants'

const getFlashId = get('payload.id')

const initialState = {
  messages: [],
}

export const flashReducers = typeToReducer({
  [REMOVE_MESSAGE]: (state, action) => evolve({
    messages: reject(propEq('id', getFlashId(action))),
  }, state),
  [ADD_MESSAGE]: (state, action) => evolve({
    messages: append(action.payload),
  }, state),
}, initialState)
