import { isBrowser } from 'app/utils/predicates'

export const GET = 'foo/GET'
export const GET_CLIENT_ONLY = 'foo/GET_CLIENT_ONLY'

export const fooGet = () => ({
  type: GET,
  payload: {
    foo: isBrowser() ? 'Data from the browser' : 'Data from the server',
  },
})

export const fooGetClientOnly = () => ({
  type: GET_CLIENT_ONLY,
  payload: {
    foo: 'Client Only Data',
  },
})
