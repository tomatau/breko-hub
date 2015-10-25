import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import {isBrowser} from '~/src/app/utils/predicates';

export const defaultMiddleware = [
  thunkMiddleware,
  promiseMiddleware()
]

export const makeCreateStore = (middleware=defaultMiddleware) => {
  const BROWSER = isBrowser()

  if (BROWSER) middleware.push(
      createLogger({ predicate: () => process.env.NODE_ENV == 'development' })
    )

  const topLevelMiddleware = [ applyMiddleware(...middleware) ]

  // if (process.env.NODE_ENV == 'development') {
  //   topLevelMiddleware.push(devTools())
  //   if (BROWSER) topLevelMiddleware.push(persistState(
  //       window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  //     ))
  // }

  return compose(...topLevelMiddleware)(createStore);
}
