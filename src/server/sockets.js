import Socket from 'socket.io'
import { inServerViaSocketIO, outServerViaSocketIO } from 'redux-via-socket.io'
import rootReducer from 'app/reducers'
import { defaultMiddleware } from 'app/services/middleware'
import { makeCreateStore } from 'app/services/makeCreateStore'

const log = {
  sockets: debug('sockets-server'),
}

export default function sockets(server) {
  log.sockets('Starting socket server')
  const socketServer = Socket(server)
  const middleware = [
    ...defaultMiddleware,
    outServerViaSocketIO(socketServer),
  ]

  const socketsStore = makeCreateStore(middleware)(rootReducer, {})

  socketServer.on('connection', socket => {
    log.sockets('New connection made with id', socket.id)
    socket.on('disconnect', ()=> {
      log.sockets('Disconnected', socket.id)
    })
  })

  inServerViaSocketIO(socketServer, (action, socket) => {
    log.sockets({
      socket: socket.id,
      ...action,
    })
    socketsStore.dispatch(action)
  })

  return socketServer
}
