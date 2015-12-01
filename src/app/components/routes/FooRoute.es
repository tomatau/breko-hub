import React from 'react'
import { prefetch } from 'react-fetcher'
import { isBrowser } from 'app/utils/predicates'

const fooFetchDataCreator = () => ({
  type: 'FOO_ROUTE_FETCH',
  payload: {
    example: isBrowser() ? 'data-from-browser' : 'data-from-server',
  },
})

@prefetch(({ store }) => {
  store.dispatch(fooFetchDataCreator())
})
class FooRoute extends React.Component {
  render() {
    return (
      <section>
        Foo
      </section>
    )
  }
}

export default FooRoute
