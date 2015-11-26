import io from 'socket.io-client'
import { isBrowser } from '~/src/app/utils/predicates'

export const socket = isBrowser() ? io() : {}
