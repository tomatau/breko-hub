import invariant from 'invariant'
import { addLeadingSlash, createPath, parsePath } from 'history/PathUtils'

const noop = () => {}

const normalizeLocation = (object) => {
  const { pathname = '/', search = '', hash = '' } = object

  return {
    pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash,
  }
}

const addBasename = (basename, location) => {
  if (!basename)
    return location

  return {
    ...location,
    pathname: addLeadingSlash(basename) + location.pathname,
  }
}

const stripBasename = (basename, location) => {
  if (!basename)
    return location

  const base = addLeadingSlash(basename)

  if (location.pathname.indexOf(base) !== 0)
    return location

  return {
    ...location,
    pathname: location.pathname.substr(base.length),
  }
}

const createLocation = (location) =>
  typeof location === 'string' ? parsePath(location) : normalizeLocation(location)

const createURL = (location) =>
  typeof location === 'string' ? location : createPath(location)

const staticHandler = (methodName) => () => {
  invariant(
    false,
    'You cannot %s with <StaticRouter>',
    methodName
  )
}

const createStaticHistory = (location='/', basename='') => {
  const createHref = (path) =>
    addLeadingSlash(basename + createURL(path))

  const handlePush = (location) => {
    history.context.action = 'PUSH'
    history.context.location = addBasename(basename, createLocation(location))
    history.context.url = createURL(history.context.location)
  }

  const handleReplace = (location) => {
    history.context.action = 'REPLACE'
    history.context.location = addBasename(basename, createLocation(location))
    history.context.url = createURL(history.context.location)
  }

  const history = {
    context: {},
    createHref: createHref,
    action: 'POP',
    location: stripBasename(basename, createLocation(location)),
    push: handlePush,
    replace: handleReplace,
    go: staticHandler('go'),
    goBack: staticHandler('goBack'),
    goForward: staticHandler('goForward'),
    listen: noop,
    block: noop,
  }

  return history
}

export default createStaticHistory
