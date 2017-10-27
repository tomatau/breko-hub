import Chance from 'chance'
import { concat, append } from 'ramda'

const chance = new Chance()

export const messages = {
  makeMessage: (msgOverrides) => ({
    id: chance.guid(),
    message: chance.sentence(),
    type: chance.pickone([ 'info', 'good', 'error' ]),
    ...msgOverrides,
  }),
}

const transforms = {
  makeMessages: () => [],
  addMessageCollection: concat([
    messages.makeMessage({ type: 'info' }),
    messages.makeMessage({ type: 'good' }),
    messages.makeMessage({ type: 'error' }),
    messages.makeMessage({ type: 'info' }),
    messages.makeMessage({ type: 'good' }),
    messages.makeMessage({ type: 'error' }),
  ]),
  addRandomMessage: append(messages.makeMessage()),
}

export default transforms
