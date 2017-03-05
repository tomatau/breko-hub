import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import * as fooActions from 'app/actions/foo.actions'
import { get } from 'app/utils'

// Example hooks
@provideHooks({
  // prefetch both for server side and client side render
  prefetch: ({ dispatch }) => dispatch(fooActions.fooGet()),
  // defer hook only on client
  defer: ({ dispatch }) => dispatch(fooActions.fooGetClientOnly()),
})
@connect(state => ({
  foo: get('foo.data')(state),
}))
export default class FooRoute extends React.Component {
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
