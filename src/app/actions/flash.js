export const REMOVE_MESSAGE = 'flash/REMOVE_MESSAGE'
export const ADD_MESSAGE = 'flash/ADD_MESSAGE'

export const removeMessage = (flash_id) => ({
  type: REMOVE_MESSAGE,
  payload: { flash_id },
})

export const addMessage = (message, type='info') => ({
  type: ADD_MESSAGE,
  payload: { message, type, id: Math.random() },
})
