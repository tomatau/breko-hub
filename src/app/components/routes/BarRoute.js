import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { apiFetch } from 'app/actions/bar'
import { get } from 'app/utils'

@provideHooks({
  prefetch: ({ store }) => store.dispatch(apiFetch()).payload.promise,
})
@connect(state => ({
  bar: get('bar.data')(state),
}))
class BarRoute extends React.Component {
  render() {
    const { bar } = this.props
    return (
      <section>
        <DocumentMeta extend {...{ title: 'Breko Hub - Bar' }} />
        <h3>Bar</h3>
        {bar.map((item, i) =>
          <p key={i}>{item}</p>
        )}
      </section>
    )
  }
}

export default BarRoute
