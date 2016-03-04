import io from 'socket.io-client'
import { hasWindow } from 'app/utils/predicates'

export const socket = hasWindow() ? io({ autoConnect: false }) : {}
