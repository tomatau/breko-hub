import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { barReducers } from './bar.reducers'
import { API_FETCH } from 'app/actions/types'

describe('Bar Reducers', ()=> {
  const initialState = {
    isPending: false,
    error: false,
    data: [],
  }
  const irrelevantAction = { type: 'IRRELEVANT_ACTION' }

  it('returns the initialState when no state', () => {
    expect(barReducers(undefined, irrelevantAction)).to.eql(initialState)
  })

  describe('API_FETCH_PENDING', ()=> {
    const stateBeforeDispatch = {
      data: 'test dirty data',
      error: new Error('test previous state error'),
      isPending: !initialState.isPending,
    }

    it('sets initialState with isPending=true', ()=> {
      const apiFetchPendingAction = {
        type: `${API_FETCH}_${PENDING}`,
      }
      expect(
        barReducers(stateBeforeDispatch, apiFetchPendingAction)
      ).to.eql({
        ...initialState,
        isPending: true,
      })
    })
  })

  describe('API_FETCH_REJECTED', ()=> {
    const stateBeforeDispatch = {
      data: 'test dirty data',
      error: new Error('test previous state error'),
      isPending: !initialState.isPending,
    }

    it('sets initialState with payload as error', ()=> {
      const apiFetchRejectedAction = {
        type: `${API_FETCH}_${REJECTED}`,
        error: true,
        payload: new Error('api_fetch error'),
      }
      expect(
        barReducers(stateBeforeDispatch, apiFetchRejectedAction)
      ).to.eql({
        ...initialState,
        error: apiFetchRejectedAction.payload,
      })
    })
  })

  describe('API_FETCH_FULFILLED', ()=> {
    const stateBeforeDispatch = {
      data: 'test dirty data',
      error: new Error('test previous state error'),
      isPending: !initialState.isPending,
    }

    it('sets initialState with payload as data', ()=> {
      const apiFetchFulfilledAction = {
        type: `${API_FETCH}_${FULFILLED}`,
        error: true,
        payload: {
          bar: [ 'some', 'test', 'data' ],
        },
      }
      expect(
        barReducers(stateBeforeDispatch, apiFetchFulfilledAction)
      ).to.eql({
        ...initialState,
        data: apiFetchFulfilledAction.payload.bar,
      })
    })
  })
})
