/* @flow */
import { Bem } from 'app/utils'
import styles from './Msg.module.scss'
import type { Message } from './types'

type Props = {
  msg: Message,
  className: string,
};

const Msg = ({ msg, className, ...props }: Props) =>
  <span {...props} {...Msg.bem(null, msg.type, className)}>
    {msg.message}
    &nbsp;
    <strong className={styles.close}>
      x
    </strong>
  </span>

Msg.bem = new Bem(styles.msg)

export default Msg
