import Socket from 'socket.io'
import { inServerViaSocketIO, outServerViaSocketIO } from 'redux-via-socket.io'
import { createMemoryHistory } from 'history'
import { middleware } from 'app/composition/middleware'
import createStore from 'app/composition/create-store'

const log = debug('sockets-server')

export default function sockets(server) {
  log('Starting socket server')
  const socketServer = Socket(server)

  const socketsStore = createStore(
    createMemoryHistory(),
    {},
    [ ...middleware, outServerViaSocketIO(socketServer) ],
  )

  socketServer.on('connection', socket => {
    log('New connection made with id', socket.id)
    socket.on('disconnect', () => {
      log('Disconnected', socket.id)
    })
  })

  inServerViaSocketIO(socketServer, (action, socket) => {
    log({
      socket: socket.id,
      ...action,
    })
    socketsStore.dispatch(action)
  })

  return socketServer
}
