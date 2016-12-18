import io from 'socket.io-client'

describe('Client Socket', function() {
  const expectedConnection = `${global.location.protocol}//${global.location.hostname}:${global.location.port}`

  it('connect to current host and port', () => {
    expect(io.managers).to.have.property(expectedConnection)
  })

  it('sets socket to reconnectionDelay alot with an auth query', () => {
    expect(io.managers[expectedConnection].opts).to.shallowDeepEqual({
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
    })
  })
})
