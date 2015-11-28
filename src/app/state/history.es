import createBrowserHistory from 'history/lib/createBrowserHistory'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import useQueries from 'history/lib/useQueries'
import { isBrowser } from '~/src/app/utils/predicates'

export const history =
  isBrowser()
    ? useQueries(createBrowserHistory)({ queryKey: false })
    : useQueries(createMemoryHistory)()

