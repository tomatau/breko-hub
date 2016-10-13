import { apiFetch, API_FETCH } from './bar'
import { request } from 'app/utils'

describe('Bar Actions', ()=> {
  describe('apiFetch()', ()=> {
    beforeEach(()=> {
      sinon.stub(request, 'fetch')
    })

    afterEach(()=> {
      request.fetch.restore()
    })

    it('should return an action resolving the promise from /api/bar', async ()=> {
      const requestResolve = { some: 'data' }
      request.fetch.returns(Promise.resolve(requestResolve))

      const actual = apiFetch()
      const resolved = await actual.payload.promise

      expect(actual.type).to.eql(API_FETCH)
      expect(resolved).to.eql(requestResolve)
    })
  })
})
