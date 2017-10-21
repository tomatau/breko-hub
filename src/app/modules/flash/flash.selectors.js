import { createSelector } from 'reselect'
import { head } from 'ramda'
import { get } from 'app/utils'

export const getMessages = get('flash.messages', [])

export const getNextMessage = createSelector([ getMessages ], head)
