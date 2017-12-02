import { filter, always, reject, isNil, flip, contains, pickBy } from 'ramda'
import validAttributes from './valid-attributes'

export const compact = filter(Boolean)

export const noop = always(undefined)

export const isOneOf = flip(contains)

export const filterNil = reject(isNil)

const isValidAttribute = isOneOf(validAttributes)

const acceptableRegex = /^data\-\w/

export const cleanProps = pickBy(
  (val, key) => isValidAttribute(key) || acceptableRegex.test(key)
)
