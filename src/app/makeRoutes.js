import { Route } from 'react-router'

import App from 'app/components/App'
import FooRoute from 'app/components/routes/FooRoute'
import BarRoute from 'app/components/routes/BarRoute'
import Oops from 'app/components/routes/Oops'
import NotFound from 'app/components/routes/NotFound'

import { store } from 'app/services/store'
import { addMessage } from 'app/actions/flash'

export const makeRoutes = () => (
  <Route path='/' component={App}>
    <Route path='foo' component={FooRoute} />
    <Route path='bar' component={BarRoute} />
    <Route path='oops' component={Oops} />
    <Route path='private' component={Oops} onEnter={(_, redirect) => {
      store.dispatch(addMessage('You may not view the private route!!', 'error'))
      redirect('/foo')
    }} />
    <Route path='*' component={NotFound} />
  </Route>
)

export default makeRoutes
