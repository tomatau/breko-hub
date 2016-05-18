import { filter, identity } from 'ramda'

export const compact = filter(identity)
