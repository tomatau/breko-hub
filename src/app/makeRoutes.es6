import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '~/src/app/componets/App';
import Oops from '~/src/app/componets/Oops';

const makeRoutes = (history) => (
  <Router history={history}>
    <Route path='/' component={App} />
    <Route path='/oops' component={Oops} />
  </Router>
)

export default makeRoutes;
