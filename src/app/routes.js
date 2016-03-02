import { Route } from 'react-router'

import App from 'app/components/App'
import FooRoute from 'app/components/routes/FooRoute'
import BarRoute from 'app/components/routes/BarRoute'
import OopsRoute from 'app/components/routes/OopsRoute'
import NotFoundRoute from 'app/components/routes/NotFoundRoute'

import { store } from 'app/services/store'
import { addMessage } from 'app/actions/flash'

export const makeRoutes = () => (
  <Route path='/' component={App}>
    <Route path='foo' component={FooRoute} />
    <Route path='bar' component={BarRoute} />
    <Route path='oops' component={OopsRoute} />
    <Route path='private' component={OopsRoute} onEnter={(_, redirect) => {
      store.dispatch(
        addMessage('You may not view the private route!!', 'error')
      )
      redirect('/foo')
    }} />
    <Route path='*' component={NotFoundRoute} />
  </Route>
)

export default makeRoutes
