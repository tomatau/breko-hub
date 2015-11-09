import Server from 'socket.io'
import log from 'npmlog'

export default function(server) {
  const socketServer = Server(server)

  socketServer.on('connection', socket => {
    log.verbose('socket:connected', socket.id)
    socket.on('disconnect', ()=> {
      log.verbose('socket:disconnected', socket.id)
    })
  })

  return socketServer
}
