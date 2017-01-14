import { path, pathOr } from 'ramda'

// get :: Array<string> | string, (defaultValue) -> Object -> any
const get = (location, or) =>
  (or == null)
    ? path(location.split('.'))
    : pathOr(or, location.split('.'))

export default get
