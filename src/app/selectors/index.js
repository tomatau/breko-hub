import { createSelector } from 'reselect'
import { get } from 'app/utils'

export const flashMessages = get('flash.messages')

export const nextFlashMessage = createSelector(
  flashMessages,
  (messages=[]) => messages.length > 0 && messages[0]
)

