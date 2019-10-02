import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Server500 = ({ className, ...props }) => (
  <div className={cx('Server500', className)} {...props}>
    There was an 500 error.
  </div>
)

Server500.propTypes = {
  className: PropTypes.string,
}

export default Server500
