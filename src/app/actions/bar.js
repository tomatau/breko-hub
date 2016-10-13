import { request } from 'app/utils'

export const API_FETCH = 'bar/API_FETCH'

export const apiFetch = () => ({
  type: API_FETCH,
  payload: {
    promise: request.fetch('/api/bar'),
  },
})

