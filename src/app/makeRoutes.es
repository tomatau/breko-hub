import React from 'react'
import { Router, Route } from 'react-router'

import App from '~/src/app/components/App'
import FooRoute from '~/src/app/components/routes/FooRoute'
import BarRoute from '~/src/app/components/routes/BarRoute'
import Oops from '~/src/app/components/Oops'

const makeRoutes = (history) => (
  <Router history={history}>
    <Route path='/' component={App}>
      <Route path='foo' component={FooRoute} />
      <Route path='bar' component={BarRoute} />
    </Route>
    <Route path='/oops' component={Oops} />
  </Router>
)

export default makeRoutes
