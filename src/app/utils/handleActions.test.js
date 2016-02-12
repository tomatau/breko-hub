import handleActions from './handleActions'

const ASYNC_ACTION = 'ASYNC_ACTION'
const SYNC_ACTION = 'SYNC_ACTION'

const reducer = handleActions({
  [ASYNC_ACTION]: {
    FULFILLED: (state, action) => ({ ...state, fulfilled: action.payload }),
    REJECTED: (state, action) => ({ ...state, rejected: action.payload }),
  },
  [SYNC_ACTION]: (state, action) => ({ ...state, sync: action.payload }),
})

describe('Handle Action', () => {
  it('should run the FULFILLED reducer', () => {
    const action = {
      type: `${ASYNC_ACTION}_FULFILLED`,
      payload: 'fulfill me',
    }
    const state = reducer({}, action)
    expect(state).to.eql({ fulfilled: 'fulfill me' })
  })

  it('should run the REJECTED reducer', () => {
    const action = {
      type: `${ASYNC_ACTION}_REJECTED`,
      payload: 'i was rejected',
    }
    const state = reducer({}, action)
    expect(state).to.eql({ rejected: 'i was rejected' })
  })

  it('should run the SYNC reducer', () => {
    const action = {
      type: SYNC_ACTION,
      payload: 'i am sync',
    }
    const state = reducer({}, action)
    expect(state).to.eql({ sync: 'i am sync' })
  })
})
