import Server from 'socket.io'
import debug from 'debug'
import { inServerViaSocketIO, outServerViaSocketIO } from 'redux-via-socket.io'
import rootReducer from 'app/reducers'
import { defaultMiddleware, makeCreateStore } from 'app/state/makeCreateStore'

const log = {
  sockets: debug('sockets-server'),
}

export default function sockets(server) {
  log.sockets('Starting socket server')
  const socketServer = Server(server)
  const middleware = [
    ...defaultMiddleware,
    outServerViaSocketIO(socketServer),
  ]

  const serverStore = makeCreateStore(middleware)(rootReducer, {})

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
    serverStore.dispatch(action)
  })

  return socketServer
}
