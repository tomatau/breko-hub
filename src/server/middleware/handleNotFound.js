import { Provider } from 'react-redux'
import App from 'app/components/App'
import NotFoundRoute from 'app/components/routes/NotFoundRoute'
import { makeHtml } from 'server/utils'

export default function(headStyles) {
  return function *handleNotFound(next) {
    yield next
    if (this.response.status === 404) {
      this.response.body = renderNotFound(this.store, headStyles)
    }
  }
}

const renderNotFound = (store, headStyles) =>
  makeHtml(store.getState(), { headStyles }, (
    <Provider store={store}>
      <App>
        <NotFoundRoute />
      </App>
    </Provider>
  ))
