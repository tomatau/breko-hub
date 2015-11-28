import React from 'react'
import { prefetch } from 'react-fetcher'
import { isBrowser } from '~/src/app/utils/predicates'


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
      <div>
        Foo
      </div>
    )
  }
}

export default FooRoute
