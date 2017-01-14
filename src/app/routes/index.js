import { Route } from 'react-router'
import { ERROR_PATH } from 'config/paths'

import App from 'app/components/App/App'
import FooRoute from 'app/routes/FooRoute'
import BarRoute from 'app/routes/BarRoute'
import OopsRoute from 'app/routes/OopsRoute'
import NotFoundRoute from 'app/routes/NotFoundRoute'

import { store } from 'app/composition/store'
import { addMessage } from 'app/actions/flash.actions'

export const makeRoutes = () => (
  <Route path='/' component={App}>
    <Route path='foo' component={FooRoute} />
    <Route path='bar' component={BarRoute} />
    <Route path='private' component={OopsRoute} onEnter={(_, redirect) => {
      store.dispatch(addMessage('You may not view the private route!!', 'error'))
      redirect('/foo')
    }} />
    <Route path={ERROR_PATH} component={OopsRoute} />
    <Route path='*' component={NotFoundRoute} />
  </Route>
)

export default makeRoutes
