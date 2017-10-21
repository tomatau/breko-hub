import { request } from 'app/utils'
import { API_FETCH } from './bar.constants'

export const apiFetch = () => ({
  type: API_FETCH,
  payload: {
    promise: request.fetch('/api/bar'),
  },
})
