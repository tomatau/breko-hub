import is_promise from 'is-promise'

export const isNodeInTree = (parent, child) => {
  if (parent == child) return true
  let node = child.parentNode
  while (node != null) {
    if (node == parent) return true
    node = node.parentNode
  }
  return false
}

export const isPromise = is_promise

export const hasWindow = () => typeof window !== 'undefined'
export const isBrowser = () => typeof GLOBAL == 'undefined'
