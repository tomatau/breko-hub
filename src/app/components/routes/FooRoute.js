import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { fooGet, fooGetClientOnly } from 'app/actions/foo'
import { get } from 'app/utils'

@provideHooks({
  prefetch: ({ store }) => store.dispatch(fooGet()),
  defer: ({ store }) => store.dispatch(fooGetClientOnly()),
})
@connect(state => ({
  foo: get('foo.data')(state),
}))
class FooRoute extends React.Component {
  render() {
    const { foo } = this.props
    return (
      <section>
        <h3>Foo</h3>
        <span>{foo}</span>
      </section>
    )
  }
}

export default FooRoute
