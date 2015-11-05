import { handleActions } from 'redux-actions'

export const errorReducers = handleActions({

  SET_ERROR: (state, action) => ({
    ...state,
    errors: [
      ...state.errors,
      action.payload.error,
    ],
  }),

}, { errors: [] })
