import { request } from 'app/utils'
import { API_FETCH } from 'app/actions/types'

export const apiFetch = () => ({
  type: API_FETCH,
  payload: {
    promise: request.fetch('/api/bar'),
  },
})
