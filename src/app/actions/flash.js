import uuid from 'uuid'

const makeFlash = (message, type='info') => ({
  type,
  message,
  id: uuid.v1(),
})

export const REMOVE_MESSAGE = 'flash/REMOVE_MESSAGE'
export const ADD_MESSAGE = 'flash/ADD_MESSAGE'

export const removeMessage = (flash_id) => ({
  type: REMOVE_MESSAGE,
  payload: { flash_id },
})

export const addMessage = (message, type='info') => ({
  type: ADD_MESSAGE,
  payload: makeFlash(message, type),
})
