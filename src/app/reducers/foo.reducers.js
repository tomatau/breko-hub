import { typeToReducer, get } from 'app/utils'
import { GET, GET_CLIENT_ONLY } from 'app/actions/foo'

const getFoo = get([ 'payload', 'foo' ])

const initialState = {
  data: null,
  isLoading: false,
  error: false,
}

export const fooReducers = typeToReducer({

  [ GET ]: (state, action) => ({
    ...state,
    data: getFoo(action),
  }),

  [ GET_CLIENT_ONLY ]: (state, action) => ({
    ...state,
    data: getFoo(action),
  }),

}, initialState)
