import { handleActions } from 'redux-actions'

export const exampleReducers = handleActions({

  [`${'EXAMPLE'}`]: (state, action) => ({
    ...state,
    example: action.payload.example,
  }),

}, { example: null })
