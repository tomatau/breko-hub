import { select, fork, take } from 'redux-saga/effects'
import * as flashSelectors from 'app/modules/flash/flash.selectors'
import { ADD_MESSAGE } from 'app/modules/flash/flash.constants'
import rootSaga, { timeoutRemoveFlash, takeFlashMessages } from './index'

describe('Saga Tests', function () {
  describe('Root Saga', () => {
    beforeEach(() => {
      this.saga = rootSaga()
    })

    it('should call select with getNextFlashMessage', () => {
      const nextFlash = { ret: 'value' }
      expect(this.saga.next()).to.deep.yield(select(flashSelectors.getNextMessage))
      expect(this.saga.next(nextFlash)).to.deep.yield(fork(timeoutRemoveFlash, nextFlash))
      expect(this.saga.next()).to.deep.yield(fork(takeFlashMessages))
    })
  })

  describe('takeFlashMessages', () => {
    beforeEach(() => {
      this.saga = takeFlashMessages()
    })

    it('should call take with an add_message', () => {
      const takeReturn = { payload: { fake: 'stuff' } }
      expect(this.saga.next()).to.deep.yield(take(ADD_MESSAGE))
      expect(this.saga.next(takeReturn)).to.deep.yield(fork(timeoutRemoveFlash, takeReturn.payload))
      expect(this.saga.next().done).to.eql(false)
    })
  })

  describe.skip('timeoutRemoveFlash', () => {
    beforeEach(() => {
      this.saga = timeoutRemoveFlash()
    })
  })
})
