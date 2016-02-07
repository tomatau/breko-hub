import { provideHooks } from 'redial'
import { isBrowser } from 'app/utils/predicates'

const fooFetchDataCreator = () => ({
  type: 'FOO_ROUTE_FETCH',
  payload: {
    example: isBrowser() ? 'data-from-browser' : 'data-from-server',
  },
})

const clietOnlyCreator = () => ({
  type: 'FOO_ROUTE_FETCH_CLIENT_ONLY',
  payload: {
    example: 'Client Only Data',
  },
})

@provideHooks({
  prefetch: ({ store }) => store.dispatch(fooFetchDataCreator()),
  defer: ({ store }) => store.dispatch(clietOnlyCreator()),
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
