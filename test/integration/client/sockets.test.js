import io from 'socket.io-client'
import 'app/composition/socket'

describe(`Client Socket`, function () {
  const { protocol, hostname, port } = global.location
  const expectedConnection = `${protocol}//${hostname}:${port}`

  it(`connect to current host and port`, () => {
    expect(io.managers).to.have.property(expectedConnection)
  })

  it(`sets socket to reconnectionDelay alot with an auth query`, () => {
    expect(io.managers[expectedConnection].opts).to.shallowDeepEqual({
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
    })
  })
})
