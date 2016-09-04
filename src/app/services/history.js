import { isBrowser } from 'app/utils'
import { browserHistory, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { store } from 'app/services/store'

export const history = isBrowser
  ? syncHistoryWithStore(browserHistory, store)
  : createMemoryHistory()
