import { curry, view, lensPath } from 'ramda'
import { isArray } from 'lodash'

const get = curry((path, object) =>
  view(lensPath(isArray(path) ? path : path.split('.')))(object)
)

export default get
