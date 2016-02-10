import { isBrowser } from 'app/utils/predicates'

const FOO_ROUTE_FETCH = 'breko-hub/FOO_ROUTE_FETCH'
const FOO_ROUTE_FETCH_CLIENT_ONLY = 'breko-hub/FOO_ROUTE_FETCH_CLIENT_ONLY'

export const fooFetchDataCreator = () => ({
  type: FOO_ROUTE_FETCH,
  payload: {
    example: isBrowser() ? 'data-from-browser' : 'data-from-server',
  },
})

export const clietOnlyCreator = () => ({
  type: FOO_ROUTE_FETCH_CLIENT_ONLY,
  payload: {
    example: 'Client Only Data',
  },
})
