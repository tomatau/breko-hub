import { handleActions } from 'redux-actions'

export const exampleReducers = handleActions({

  [`${'FOO_ROUTE_FETCH'}`]: (state, action) => ({
    ...state,
    example: action.payload.example,
  }),

  [`${'FOO_ROUTE_FETCH_CLIENT_ONLY'}`]: (state, action) => ({
    ...state,
    example: action.payload.example,
  }),

}, { example: null })
