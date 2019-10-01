import { request, ConfigService } from 'app/utils'
import { API_FETCH } from './bar.constants'
import { apiFetch } from './bar.actions'

describe(`Bar Actions`, function () {
  describe(`apiFetch()`, () => {
    beforeEach(() => {
      sinon.stub(request, 'fetch')
    })

    afterEach(() => {
      request.fetch.restore()
    })

    it(`returns an action with type API_FETCH`, () => {
      expect(apiFetch()).to.have.property('type', API_FETCH)
    })

    it(`calls fetch with /api/bar`, () => {
      apiFetch()
      expect(request.fetch).to.have.been.calledWith(
        ConfigService.get('API_ENDPOINT') + '/bar'
      )
    })

    it(`resolves the promise from fetching /api/bar`, () => {
      const requestResolve = { some: 'data' }
      request.fetch.returns(Promise.resolve(requestResolve))

      expect(apiFetch().payload.promise).to.eventually.eql(requestResolve)
    })
  })
})
