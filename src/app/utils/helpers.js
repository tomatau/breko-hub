import {
  always,
  contains,
  filter,
  flip,
  isNil,
  mapObjIndexed,
  pickBy,
  reject,
} from 'ramda'
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

export const addKeyAsProperty = name => mapObjIndexed(
  (value, key) => ({ [name]: key, ...value })
)
