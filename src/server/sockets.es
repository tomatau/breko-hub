import Server from 'socket.io'
import debug from 'debug'

const log = {
  sockets: debug('sockets'),
}

export default function(server) {
  log.sockets('Starting socket server')
  const socketServer = Server(server)
  socketServer.on('connection', socket => {
    log.sockets('Connected', socket.id)
    socket.on('disconnect', ()=> {
      log.sockets('Disconnected', socket.id)
    })
  })

  return socketServer
}
