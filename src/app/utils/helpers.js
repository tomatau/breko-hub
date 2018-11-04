import {
  always,
  contains,
  filter,
  flip,
  isNil,
  mapObjIndexed,
  pickBy,
  reject,
  unapply,
  nth,
  pipe,
  either,
  test,
} from 'ramda'

import validAttributes from './valid-attributes'

export const compact = filter(Boolean)

export const noop = always(undefined)

export const isOneOf = flip(contains)

export const filterNil = reject(isNil)

export const secondArg = unapply(nth(1))

const isValidAttrName = either(
  isOneOf(validAttributes),
  test(/^data\-\w/)
)

export const cleanProps = pickBy(
  pipe(
    secondArg,
    isValidAttrName
  )
)

export const addKeyAsProperty = name =>
  mapObjIndexed((value, key) => ({ [name]: key, ...value }))
