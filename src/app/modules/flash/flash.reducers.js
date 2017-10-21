import { filter } from 'ramda'
import { typeToReducer, get } from 'app/utils'
import { REMOVE_MESSAGE, ADD_MESSAGE } from './flash.constants'

const getFlashId = get('payload.id')

const initialState = {
  messages: [],
}

export const flashReducers = typeToReducer({
  [REMOVE_MESSAGE]: (state, action) => ({
    ...state,
    messages: filter(
      flash => flash.id !== getFlashId(action),
      state.messages
    ),
  }),
  [ADD_MESSAGE]: (state, action) => ({
    ...state,
    messages: [ ...state.messages, action.payload ],
  }),
}, initialState)
