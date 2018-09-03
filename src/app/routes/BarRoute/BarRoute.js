import React from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'
import { noop } from 'app/utils'
import { barRoute as barRouteCopy } from 'app/copy'
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
          <title>{barRouteCopy.documentTitle}</title>
        </DocumentMeta>
        {barRouteCopy.content}
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
