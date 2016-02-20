import { isBrowser } from 'app/utils/predicates'
import { browserHistory, createMemoryHistory } from 'react-router'

export const history = isBrowser()
  ? browserHistory
  : createMemoryHistory()
