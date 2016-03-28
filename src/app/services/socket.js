import io from 'socket.io-client'
import { hasWindow } from 'app/utils/predicates'

export const socket = hasWindow
  ? io({
    autoConnect: false,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
  }) : {}
