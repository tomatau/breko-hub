import { addMessage, ADD_MESSAGE } from './flash'
import uuid from 'uuid'

describe('Flash Actions', ()=> {
  describe('addMessage()', ()=> {
    beforeEach(()=> {
      sinon.stub(uuid, 'v1')
    })

    afterEach(()=> {
      uuid.v1.restore()
    })

    it('returns an action with flash msg and a default type', ()=> {
      const v1Return = { data: { some: 'data' } }
      const message = 'test message'
      uuid.v1.returns(v1Return)
      expect(addMessage(message)).to.eql({
        type: ADD_MESSAGE,
        payload: {
          type: 'info',
          message,
          id: v1Return,
        },
      })
    })

    it('should allow overwriting of the message type', ()=> {
      const type = 'test type'
      expect(addMessage(null, type))
        .to.have.deep.property('payload.type', type)
    })
  })
})
