import { connect } from 'react-redux'
import DocumentMeta from 'react-helmet'
import { get, noop } from 'app/utils'
import * as barActions from 'app/modules/bar/bar.actions'
import style from './BarRoute.module.scss'

@connect(state => ({
  bar: get('bar.data')(state),
}), barActions)
export default class BarRoute extends React.Component {
  static defaultProps = {
    bar: [],
    apiFetch: noop,
  };

  componentDidMount() {
    this.props.apiFetch()
  }

  render() {
    const { bar } = this.props
    return (
      <section className='BarRoute'>
        <DocumentMeta>
          <title>Bar</title>
        </DocumentMeta>
        <h3>Bar</h3>
        <p>This route is making an api request</p>
        <p>If you change the response from <code>server/api/bar</code> endpoint</p>
        <p>And then navigate away and back to this route, you'll see the changes immediately</p>
        <div className={style.block}>
          {bar.map((item, i) =>
            <p key={i}>{item}</p>
          )}
        </div>
      </section>
    )
  }
}
