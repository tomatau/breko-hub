import io from 'socket.io-client'
import { isBrowser } from 'app/utils/predicates'

export const socket = isBrowser() ? io() : {}
