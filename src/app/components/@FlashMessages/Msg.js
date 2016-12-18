import { Bem } from 'app/utils'
import styles from './Msg.module.scss'

const { PropTypes } = React

const Msg = ({ msg, className, ...props }) =>
  <span {...props} {...Msg.bem(null, msg.type, className)}>
    {msg.message}
    &nbsp;
    <strong className={styles.close}>
      x
    </strong>
  </span>

Msg.bem = Bem(styles.msg)

Msg.propTypes = {
  msg: PropTypes.shape({
    type: PropTypes.oneOf([ 'error', 'good', 'info' ]),
    message: PropTypes.string,
  }).isRequired,
}

export default Msg
