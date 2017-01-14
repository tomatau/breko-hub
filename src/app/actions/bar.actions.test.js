import { apiFetch, API_FETCH } from './bar.actions'
import { request } from 'app/utils'

describe('Bar Actions', ()=> {
  describe('apiFetch()', ()=> {
    beforeEach(()=> {
      sinon.stub(request, 'fetch')
    })

    afterEach(()=> {
      request.fetch.restore()
    })

    it('returns an action with type API_FETCH', () => {
      expect(apiFetch()).to.have.property('type', API_FETCH)
    })

    it('calls fetch with /api/bar', () => {
      apiFetch()
      expect(request.fetch).to.have.been.calledWith('/api/bar')
    })

    it('resolves the promise from fetching /api/bar', async () => {
      const requestResolve = { some: 'data' }
      request.fetch.returns(Promise.resolve(requestResolve))

      expect(apiFetch().payload.promise).to.eventually.eql(requestResolve)
    })
  })
})
