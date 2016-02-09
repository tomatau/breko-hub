import { handleActions } from 'redux-actions'
import { view, filter, lensPath } from 'ramda'

const getFlashId = view(lensPath([ 'payload', 'flash_id' ]))

export const flashReducers = handleActions({

  REMOVE_FLASH: (state, action) => ({
    ...state,
    messages: filter(
      flash => flash.id !== getFlashId(action),
      state.messages
    ),
  }),

}, { messages: [] })
