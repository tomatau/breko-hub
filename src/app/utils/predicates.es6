export const isNodeInTree = (parent, child) => {
  if (parent == child) return true
  let node = child.parentNode
  while (node != null) {
    if (node == parent) return true
    node = node.parentNode
  }
  return false
}

export const isPromise = (obj) =>
  !!obj && (typeof obj === 'object' || typeof obj === 'function')
        && typeof obj.then === 'function'

export const isBrowser = () => {
  return typeof GLOBAL == 'undefined'
}
