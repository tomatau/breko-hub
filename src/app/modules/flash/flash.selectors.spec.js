import fixtures from 'helpers/fixtures'
import * as flashSelectors from './flash.selectors'

describe('Flash Selectors', function () {
  describe('getMessages()', () => {
    it('returns an empty array by default', () => {
      expect(
        flashSelectors.getMessages(null)
      ).to.be.an('array').with.length(0)
    })

    it('returns the flash messages', () => {
      const state = {
        flash: {
          messages: fixtures(
            'makeMessages',
            'addRandomMessage',
            'addRandomMessage',
            'addRandomMessage',
            'addRandomMessage',
          ),
        },
      }
      expect(flashSelectors.getMessages(state)).to.eql(state.flash.messages)
    })
  })

  describe('getNextMessage()', () => {
    it('returns undefined by default', () => {
      expect(
        flashSelectors.getNextMessage(null)
      ).to.eql(undefined)
    })

    it('returns the flash message start of list', () => {
      const state = {
        flash: {
          messages: fixtures(
            'makeMessages',
            'addRandomMessage',
            'addRandomMessage',
            'addRandomMessage',
            'addRandomMessage',
          ),
        },
      }
      expect(
        flashSelectors.getNextMessage(state)
      ).to.eql(state.flash.messages[0])
    })
  })
})
