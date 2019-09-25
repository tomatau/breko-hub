const ensureObject = val =>
  (typeof val === 'string')
    ? JSON.parse(val)
    : val

export class _ConfigService {
  _env = '';
  _vars = {};

  setEnv(env) {
    this._env = env
  }

  getEnv() {
    return this._env
  }

  isEnv(...envs) {
    return envs.includes(this._env)
  }

  setVars(vars) {
    this._vars = ensureObject(vars)
  }

  getVars() {
    return this._vars
  }

  assignVars(vars) {
    this._vars = {
      ...this._vars,
      ...ensureObject(vars),
    }
  }

  set(key, val) {
    this._vars[key] = val
  }

  get(key) {
    return this._vars[key]
  }
}

export default new _ConfigService()
