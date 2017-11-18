import path from 'path'

export const ROOT = path.join(__dirname, '..', '..')
export const SRC = path.join(ROOT, 'src')
export const TESTS = path.join(ROOT, 'test')
export const APP = path.join(SRC, 'app')
export const CONFIG = path.join(SRC, 'config')
export const SERVER = path.join(SRC, 'server')
export const SOCKETS = path.join(SERVER, 'sockets')
export const STATIC = path.join(SRC, 'static')
export const ASSETS = path.join(SRC, 'assets')
export const STYLES = path.join(SRC, 'styles')
export const ASSET_FILE = `${SERVER}/webpack-assets.json`
export const LOADABLE = `${SERVER}/loadable-modules.json`
