import io from 'socket.io-client'

const socket = io({
  autoConnect: false,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
})

export default socket
