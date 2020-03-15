import { uuid } from 'app/utils'
import { REMOVE_MESSAGE, ADD_MESSAGE } from './flash.constants'

const makeFlash = (message, type='info') => ({
  type,
  message,
  id: uuid.v1(),
})

export const removeMessage = (id) => ({
  type: REMOVE_MESSAGE,
  payload: { id },
})

export const addMessage = (message, type='info') => ({
  type: ADD_MESSAGE,
  payload: makeFlash(message, type),
})
