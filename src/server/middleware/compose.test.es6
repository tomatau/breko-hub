import co from 'co'
import compose from './compose'

describe('Compose Middleware', ()=> {
  it('should be a function', ()=> {
    expect(compose).to.be.a('function')
  })
})
