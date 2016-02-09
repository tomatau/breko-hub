import co from 'co'
import compose from './compose'

describe('Compose Middleware Utility', ()=> {
  it('throws if called with no callbacks', ()=> {
    expect(compose).to.throw(TypeError)
  })

  it('throws if called with no none functions', ()=> {
    expect(() => compose([])).to.throw(TypeError)
  })

  it('chains middlewares in order with upstream', async ()=> {
    let arr = []
    const stack = [
      function *one(next) {
        arr.push(1)
        yield next
        arr.push(6)
      },
      function *two(next) {
        arr.push(2)
        yield next
        arr.push(5)
      },
      function *three(next) {
        arr.push(3)
        yield next
        arr.push(4)
      },
    ]
    await co.wrap(compose(...stack))({})
    expect(arr).to.eql([ 1, 2, 3, 4, 5, 6 ])
  })

  it('keeps the same context for middlewares', async ()=> {
    let arr = []
    const stack = [
      function *one(next) {
        this.first = 'first'
        yield next
      },
      function *two(next) {
        this.second = 'second'
        yield next
      },
      function *three(next) {
        arr.push(this.first, this.second, 'third')
        yield next
      },
    ]
    await co.wrap(compose(...stack))({})
    expect(arr).to.eql([ 'first', 'second', 'third' ])
  })

  it('throws on errors in middleware', ()=> {
    let arr = []
    return expect(
      co.wrap(
        compose(function *one() {
          arr.push(1)
          throw new Error('test error')
        })
      )({})
    ).to.be.rejectedWith(/test error/)
  })

  it('catches downstream errors', async()=> {
    let arr = []
    const stack = [
      function *(next) {
        arr.push(1)
        try {
          arr.push(6)
          yield next
          arr.push(7)
        } catch (err) {
          arr.push(2)
        }
        arr.push(3)
      },
      function *() {
        arr.push(4)
        throw new Error()
      },
    ]
    await co.wrap(compose(...stack))({})
    expect(arr).to.eql([ 1, 6, 4, 2, 3 ])
  })
})
