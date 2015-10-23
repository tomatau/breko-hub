export const isNodeInTree = (parent, child) => {
  if (parent == child) return true
  let node = child.parentNode
  while (node != null) {
    if (node == parent) return true
    node = node.parentNode
  }
  return false
}

export const isPromise = (value) => {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function'
  }
}

export const isBrowser = () => {
  return typeof GLOBAL == 'undefined'
}
