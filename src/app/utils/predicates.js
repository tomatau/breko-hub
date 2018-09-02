import is_promise from 'is-promise'
import { contains } from 'ramda'

export const isPromise = is_promise
export const hasWindow = typeof window !== 'undefined'
export const isBrowser = process.env.APP_ENV === 'browser'

export const isEnv = (...environmentStrings) =>
  contains(process.env.NODE_ENV)(environmentStrings)
