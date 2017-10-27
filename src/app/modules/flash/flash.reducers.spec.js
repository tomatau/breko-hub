import fixtures from 'helpers/fixtures'
import { flashReducers } from './flash.reducers'
import { REMOVE_MESSAGE, ADD_MESSAGE } from './flash.constants'

describe(`Flash Reducers`, function () {
  const initialState = {
    messages: [],
  }
  const irrelevantAction = { type: 'IRRELEVANT_ACTION' }

  it(`should return the initial state`, () => {
    expect(flashReducers(undefined, irrelevantAction)).to.eql(initialState)
  })

  describe(REMOVE_MESSAGE, () => {
    const messages = fixtures(
      'makeMessages',
      'addMessageCollection',
    )
    const previousState = {
      messages,
      test: 'test previous state',
    }
    const removeFlashAction = {
      type: REMOVE_MESSAGE,
      payload: {
        id: _.sample(messages).id,
      },
    }

    it(`does nothing when the id isn't contained`, () => {
      function assertStateUnchanged(state, id) {
        removeFlashAction.payload.id = id
        expect(
          flashReducers(state, removeFlashAction)
        ).to.eql(state)
      }
      assertStateUnchanged(previousState, 'not-contained')
      assertStateUnchanged(previousState, void 0)
      assertStateUnchanged(previousState, 99)
      assertStateUnchanged(previousState, {})
      assertStateUnchanged(previousState, '')
    })

    it(`removes a message by id`, () => {
      _.map(messages, ({ id }) => {
        removeFlashAction.payload.id = id
        const actual = flashReducers(previousState, removeFlashAction)
        const expectedMessages = _.reject(messages, {
          id: removeFlashAction.payload.id,
        })
        expect(actual.messages).to.eql(expectedMessages)
      })
    })
  })

  describe(ADD_MESSAGE, () => {
    const messages = fixtures(
      'makeMessages',
      'addMessageCollection',
    )
    const previousState = {
      messages,
      test: 'test previous state',
    }
    const addFlashAction = {
      type: ADD_MESSAGE,
      payload: { id: 'test payload id' },
    }

    it(`keeps previous state and adding action.payload to messages`, () => {
      expect(
        flashReducers(previousState, addFlashAction)
      ).to.eql({
        ...previousState,
        messages: messages.concat(addFlashAction.payload),
      })
    })
  })
})
