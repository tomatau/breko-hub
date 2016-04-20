import { barReducers } from './bar.reducers'
import { API_FETCH } from 'app/actions/bar'

describe('Bar Reducers', ()=> {
  it('should return the initial state', ()=> {
    expect(barReducers(undefined, {})).to.eql({
      isPending: false,
      error: false,
      data: [],
    })
  })

  context('Given Store has State', ()=> {
    const stateBeforeDispatch = {
      data: 'some stuff',
      error: new Error('an error'),
      isPending: false,
    }

    describe('API_FETCH_PENDING', ()=> {
      it('should set isPending=true', ()=> {
        const apiFetchPendingAction = {
          type: `${API_FETCH}_PENDING`,
        }
        expect(
          barReducers(stateBeforeDispatch, apiFetchPendingAction)
        ).to.eql({
          isPending: true,
          error: false,
          data: [],
        })
      })
    })

    describe('API_FETCH_REJECTED', ()=> {
      it('should set error to the error', ()=> {
        const apiFetchRejectedAction = {
          type: `${API_FETCH}_REJECTED`,
          error: true,
          payload: new Error('api_fetch error'),
        }
        expect(
          barReducers(stateBeforeDispatch, apiFetchRejectedAction)
        ).to.eql({
          isPending: false,
          error: apiFetchRejectedAction.payload,
          data: [],
        })
      })
    })

    describe('API_FETCH_FULFILLED', ()=> {
      it('should set error to the error', ()=> {
        const apiFetchFulfilledAction = {
          type: `${API_FETCH}_FULFILLED`,
          error: true,
          payload: {
            bar: [ 'some', 'test', 'data' ],
          },
        }
        expect(
          barReducers(stateBeforeDispatch, apiFetchFulfilledAction)
        ).to.eql({
          isPending: false,
          data: apiFetchFulfilledAction.payload.bar,
          error: false,
        })
      })
    })
  })
})
