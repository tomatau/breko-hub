import { filter } from 'ramda'
import { typeToReducer, get } from 'app/utils'

const getFlashId = get([ 'payload', 'flash_id' ])
const initialState = { messages: [] }

export const flashReducers = typeToReducer({

  ['REMOVE_FLASH']: (state, action) => ({
    ...state,
    messages: filter(
      flash => flash.id !== getFlashId(action),
      state.messages
    ),
  }),

}, initialState)
