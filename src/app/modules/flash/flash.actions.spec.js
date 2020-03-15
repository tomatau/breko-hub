import { uuid } from 'app/utils'
import * as actions from './flash.actions'
import { REMOVE_MESSAGE, ADD_MESSAGE } from './flash.constants'

describe('Flash Actions', function () {
  describe('addMessage()', () => {
    beforeEach(() => {
      sinon.stub(uuid, 'v1')
    })

    afterEach(() => {
      uuid.v1.restore()
    })

    it('returns an action with type ADD_MESSAGE', () => {
      expect(
        actions.addMessage()
      ).to.have.property('type', ADD_MESSAGE)
    })

    it('returns an action with flash msg and a default type', () => {
      const uuidReturn = { data: { some: 'data' } }
      const message = 'test message'
      uuid.v1.returns(uuidReturn)
      expect(
        actions.addMessage(message)
      ).to.have.property('payload').which.eql({
        type: 'info',
        message,
        id: uuidReturn,
      })
    })

    it('allows overwriting of the message type', () => {
      const type = 'test type'
      expect(
        actions.addMessage(null, type)
      ).to.have.nested.property('payload.type', type)
    })
  })

  describe('removeMessage()', () => {
    it('returns an action with type REMOVE_MESSAGE', () => {
      expect(
        actions.removeMessage()
      ).to.have.property('type', REMOVE_MESSAGE)
    })

    it('sets payload with id from arguments', () => {
      const id = 'test flash id'
      expect(
        actions.removeMessage(id)
      ).to.have.property('payload').which.eql({ id })
    })
  })
})
