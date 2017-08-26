import { filter, identity, always, reject, isNil, flip, contains } from 'ramda'

export const compact = filter(identity)

export const noop = always(undefined)

export const isOneOf = flip(contains)

// strips null and undefined from array
export const filterNil = reject(isNil)
