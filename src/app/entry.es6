import createBrowserHistory from 'history/lib/createBrowserHistory';
import ReactDOM from 'react-dom';
import makeRoutes from '~/src/app/makeRoutes';
import {history} from '~/src/app/utils/history';
import {makeContent} from '~/src/app/utils/makeContent';
import {defaultMiddleware, makeCreateStore} from '~/src/app/store/configureStore';
import rootReducer from '~/src/app/reducers';

console.info(`Running in [${process.env.NODE_ENV}] environment`)

const middleware = [
  ...defaultMiddleware,
  // client only middleware
]
const store = makeCreateStore(middleware)(rootReducer, window.__INITIAL_STATE__)

if (module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(require('./reducers'))
  )
}

ReactDOM.render(
  makeContent(makeRoutes(history), store),
  document.getElementById('application-root')
)
