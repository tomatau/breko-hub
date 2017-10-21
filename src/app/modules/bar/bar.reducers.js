import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { typeToReducer, get } from 'app/utils'
import { API_FETCH } from './bar.constants'

const getBar = get('payload.bar')

const initialState = {
  isPending: false,
  error: false,
  data: [],
}

export const barReducers = typeToReducer({
  [API_FETCH]: {
    [PENDING]: () => ({
      ...initialState,
      isPending: true,
    }),
    [REJECTED]: (state, action) => ({
      ...initialState,
      error: action.payload,
    }),
    [FULFILLED]: (state, action) => ({
      ...initialState,
      data: getBar(action),
    }),
  },
}, initialState)
