import Server from 'socket.io'
import debug from 'debug'

export default function(server) {
  debug('sockets')('Starting socket server')
  const socketServer = Server(server)
  socketServer.on('connection', socket => {
    debug('socket:connected')(socket.id)
    socket.on('disconnect', ()=> {
      debug('socket:disconnected')(socket.id)
    })
  })

  return socketServer
}
