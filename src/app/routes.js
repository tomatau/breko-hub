import { Route } from 'react-router'
import { ERROR_PATH } from 'config/paths'

import App from 'app/components/App'
import FooRoute from 'app/components/routes/FooRoute'
import BarRoute from 'app/components/routes/BarRoute'
import OopsRoute from 'app/components/routes/OopsRoute'
import NotFoundRoute from 'app/components/routes/NotFoundRoute'

import { dispatch } from 'app/services/store'
import { addMessage } from 'app/actions/flash'

export const makeRoutes = () => (
  <Route path='/' component={App}>
    <Route path='foo' component={FooRoute} />
    <Route path='bar' component={BarRoute} />
    <Route path='private' component={OopsRoute} onEnter={(_, redirect) => {
      dispatch(addMessage('You may not view the private route!!', 'error'))
      redirect('/foo')
    }} />
    <Route path={ERROR_PATH} component={OopsRoute} />
    <Route path='*' component={NotFoundRoute} />
  </Route>
)

export default makeRoutes
