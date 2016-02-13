import { reduce, isFunction } from 'lodash'

export default function typeToReducer(reducerMap, initialState) {
  const makeType = (prefix, type) => prefix.concat(type).join('_')

  const iterator = (reducers, initial={}, prefix=[]) =>
    reduce(reducers, (acc, reducer, type) =>
      isFunction(reducer)
        ? { ...acc, [makeType(prefix, type)]: reducer }
        : iterator(reducer, acc, [ makeType(prefix, type) ])
    , initial)

  const flattened = iterator(reducerMap)

  return (state=initialState, action) => {
    const reducer = flattened[action.type]
    return reducer ? reducer(state, action) : state
  }
}
