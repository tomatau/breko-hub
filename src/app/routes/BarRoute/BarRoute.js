import React from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import { noop } from 'app/utils'
import { nav as navCopy } from 'app/copy'
import { apiFetch } from 'app/modules/bar/bar.actions'
import { getBar } from 'app/modules/bar/bar.selectors'
import style from './BarRoute.module.scss'

@connect(state => ({
  bar: getBar(state),
}), { apiFetch })
class BarRoute extends React.Component {
  static defaultProps = {
    bar: [],
    apiFetch: noop,
  };

  componentDidMount() {
    const { apiFetch } = this.props
    apiFetch()
  }

  render() {
    const { bar } = this.props
    return (
      <section className='BarRoute'>
        <DocumentMeta>
          <title>{navCopy.bar}</title>
        </DocumentMeta>
        <h3>{navCopy.bar}</h3>
        <p>This route is making an api request</p>
        <p>If you change the response from <code>server/api/bar</code> endpoint</p>
        <p>And then navigate away and back to this route, you&apos;ll see the changes immediately</p>
        <div className={style.block}>
          {bar.map((item, i) =>
            <p key={i}>{item}</p>
          )}
        </div>
      </section>
    )
  }
}

export default hot(module)(BarRoute)
