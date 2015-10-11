import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <main className='application'>
        The App
      </main>
    )
  }
}

class Error extends React.Component {
  render() {
    return (
      <main className='application'>
        PROBLEM
      </main>
    )
  }
}

const makeRoutes = (history) => (
  <Router history={history}>
    <Route path='/' component={App} />
    <Route path='/oops' component={Error} />
  </Router>
)

export default makeRoutes;
