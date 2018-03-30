import React from 'react'
import { Provider } from 'react-redux'
import { sagaMiddleware } from 'app/composition/middleware'
import rootSaga from 'app/sagas'
import App from 'app/components/App/App'

export const Main = (store, history, Router) => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
)

export const run = () => sagaMiddleware.run(rootSaga)
