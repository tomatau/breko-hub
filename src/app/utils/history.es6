import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { isBrowser } from '~/src/app/utils/predicates';

export const history =
  isBrowser()
    ? createBrowserHistory({ queryKey: false })
    : createMemoryHistory()
