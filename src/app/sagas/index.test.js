import rootSaga, { timeoutRemoveFlash, takeFlashMessages } from './index'
import { select, fork, take } from 'redux-saga/effects'
import * as selectors from 'app/selectors'
import { /*removeMessage, */ADD_MESSAGE/*, REMOVE_MESSAGE*/ } from 'app/actions/flash'

describe('Saga Tests', function() {
  describe('Root Saga', ()=> {
    beforeEach(()=> {
      this.saga = rootSaga()
    })

    it('should call select with nextFlashMessage', ()=> {
      const nextFlashReturn = { ret: 'value' }
      expect(this.saga.next().value).to.eql(select(selectors.nextFlashMessage))
      expect(
        this.saga.next(nextFlashReturn).value
      ).to.eql(fork(timeoutRemoveFlash, nextFlashReturn))
      expect(this.saga.next().value).to.eql(fork(takeFlashMessages))
    })
  })

  describe('takeFlashMessages', ()=> {
    beforeEach(()=> {
      this.saga = takeFlashMessages()
    })

    it('should call take with an add_message', ()=> {
      expect(this.saga.next().value).to.eql(take(ADD_MESSAGE))
      const takeReturn = { payload: { fake: 'stuff' } }
      expect(
        this.saga.next(takeReturn).value
      ).to.eql(fork(timeoutRemoveFlash, takeReturn.payload))
      expect(this.saga.next().done).to.eql(false)
    })
  })

  describe.skip('timeoutRemoveFlash', ()=> {
    beforeEach(()=> {
      this.saga = timeoutRemoveFlash()
    })
  })
})
