import socket from 'app/composition/socket'
import 'app/main'
/*

 */
describe('Client Socket', function() {
  afterEach(()=> {
    socket.close()
  })

  it('connect to current host and port', ()=> {
    socket.open()
    expect(socket.io.engine.hostname).to.eql(global.location.hostname)
    expect(socket.io.engine.port).to.eql(global.location.port)
  })
})
