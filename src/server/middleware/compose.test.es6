import co from 'co'
import compose from './compose'
import koa from 'koa'
import httpMocks from 'node-mocks-http'

const app = koa()

describe('Compose', ()=> {
  it('chains middlewares in order', ()=> {
    let arr = []
    const stack = [
      function *one(next){
        arr.push(1)
        yield next;
      },
      function *two(next){
        arr.push(2)
        yield next;
      },
      function *three(next){
        arr.push(3)
        yield next;
      }
    ]

    app.use(compose(...stack))
    app.callback()({}, {})
    expect(arr).to.eql([1, 2, 3])
  })

  it('keeps the same context for middlewares', ()=> {
    let arr = []
    const stack = [
      function *one(next){
        this.first = 'first';
        yield next;
      },
      function *two(next){
        this.second = 'second';
        yield next;
      },
      function *three(next){
        arr.push(this.first, this.second, 'third')
        yield next;
      }
    ]
    app.use(compose(...stack))
    app.callback()({}, {})
    expect(arr).to.eql(['first', 'second', 'third'])
  })
})
