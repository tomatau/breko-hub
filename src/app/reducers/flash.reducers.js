import { filter } from 'ramda'
import { handleActions, get } from 'app/utils'

const getFlashId = get([ 'payload', 'flash_id' ])

export const flashReducers = handleActions({

  ['REMOVE_FLASH']: (state, action) => ({
    ...state,
    messages: filter(
      flash => flash.id !== getFlashId(action),
      state.messages
    ),
  }),

}, { messages: [] })
