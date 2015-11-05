import { handleActions } from 'redux-actions'

export const flashReducers = handleActions({

  REMOVE_FLASH: (state, action) => ({
    ...state,
    messages: state.messages.filter(
      flash => flash.id !== action.flash_id
    ),
  }),

}, { messages: [] })
