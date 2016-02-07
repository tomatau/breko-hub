import { Route } from 'react-router'

import App from 'app/components/App'
import FooRoute from 'app/components/routes/FooRoute'
import BarRoute from 'app/components/routes/BarRoute'
import Oops from 'app/components/Oops'

const makeRoutes = () => (
  <Route path='/' component={App}>
    <Route path='foo' component={FooRoute} />
    <Route path='bar' component={BarRoute} />
    <Route path='oops' component={Oops} />
    <Route path='private' component={Oops} onEnter={(_, go) => go(null, '/foo')} />
  </Route>
)

export default makeRoutes
