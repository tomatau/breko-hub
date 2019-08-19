import React from 'react'
import { connect } from 'react-redux'
import { Helmet as DocumentMeta } from 'react-helmet-async'
import { noop } from 'app/utils'
import { barRoute as barRouteCopy } from 'app/copy'
import { apiFetch } from 'app/modules/bar/bar.actions'
import { getBar } from 'app/modules/bar/bar.selectors'
import style from './BarRoute.module.scss'

@connect(state => ({
  bar: getBar(state),
}), { apiFetch })
export default class BarRoute extends React.Component {
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
      <>
        <DocumentMeta>
          <title>{barRouteCopy.documentTitle}</title>
        </DocumentMeta>
        <section className='BarRoute'>
          {barRouteCopy.content}
          <div className={style.block} aria-live='polite'>
            {bar.map((item, i) =>
              <p key={i}>{item}</p>
            )}
          </div>
        </section>
      </>
    )
  }
}
