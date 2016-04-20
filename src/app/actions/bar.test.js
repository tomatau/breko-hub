import { apiFetch, API_FETCH } from './bar'
import { fetch } from 'app/utils'

describe('Bar Actions', ()=> {
  describe('apiFetch()', ()=> {
    beforeEach(()=> {
      sinon.stub(fetch, 'get')
    })

    afterEach(()=> {
      fetch.get.restore()
    })

    it('should return an action resolving the promise from /api/bar', async ()=> {
      const fetchResolve = { data: { some: 'data' } }
      fetch.get.returns(Promise.resolve(fetchResolve))
      const actual = apiFetch()
      expect(actual.type).to.eql(API_FETCH)
      const resolved = await actual.payload.promise
      expect(resolved).to.eql(fetchResolve.data)
    })
  })
})
