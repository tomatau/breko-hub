import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { fooGet, fooGetClientOnly } from 'app/actions/foo'
import { get } from 'app/utils'

// Example hooks
@provideHooks({
  // prefetch both for server side and client side render
  prefetch: ({ dispatch }) => dispatch(fooGet()),
  // defer hook only on client
  defer: ({ dispatch }) => dispatch(fooGetClientOnly()),
})
@connect(state => ({
  foo: get('foo.data')(state),
}))
class FooRoute extends React.Component {
  render() {
    const { foo } = this.props
    return (
      <section className='FooRoute'>
        <h3>Foo</h3>
        <span>{foo}</span>
      </section>
    )
  }
}

export default FooRoute
