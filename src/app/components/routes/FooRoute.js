import { provideHooks } from 'redial'
import { fooFetchDataCreator, clietOnlyCreator } from 'app/actions'

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
