import { Bem } from 'app/utils'
import styles from './Msg.module.scss'
import PropTypes from 'prop-types'

const Msg = ({ msg, className, ...props }) =>
  <span {...props} {...Msg.bem(null, msg.type, className)}>
    {msg.message}
    &nbsp;
    <strong className={styles.close}>
      x
    </strong>
  </span>

Msg.bem = new Bem(styles.msg)

Msg.propTypes = {
  msg: PropTypes.shape({
    type: PropTypes.oneOf([ 'error', 'good', 'info' ]),
    message: PropTypes.string,
  }).isRequired,
}

export default Msg
