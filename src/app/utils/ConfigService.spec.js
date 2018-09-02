import defaultExport, { _ConfigService } from './ConfigService'

describe(`ConfigService`, function () {
  beforeEach(() => {
    this.configService = new _ConfigService()
  })

  it(`exports an instance of _ConfigService as default`, () => {
    expect(defaultExport).to.be.an.instanceOf(_ConfigService)
  })

  describe(`Env`, () => {
    it(`sets and gets env to a string`, () => {
      const testValues = [
        'test-config-env-string',
        'second-test-config-env-string',
        'another-test-config-env-string',
      ]

      testValues.forEach(envString => {
        this.configService.setEnv(envString)
        expect(this.configService.getEnv()).to.eql(envString)
      })
    })

    it(`defaults env to an empty string`, () => {
      expect(this.configService.getEnv()).to.eql('')
    })

    it(`returns true from isEnv when value is one of args`, () => {
      const testOptions = [
        {
          env: 'dev',
          args: [ 'not', 'containing', 'env' ],
          returnVal: false,
        },
        {
          env: 'dev',
          args: [ 'has', 'dev', 'in', 'args' ],
          returnVal: true,
        },
      ]

      testOptions.forEach(options => {
        this.configService.setEnv(options.env)
        expect(
          this.configService.isEnv(...options.args)
        ).to.eql(options.returnVal)
      })
    })
  })

  describe(`Vars`, () => {
    it(`setsVars and getsVars configVars from JSON object strings`, () => {
      const testVars = [
        { foo: 'bar' },
        { baz: { deeper: { deepest: [ 1, 2 ] } } },
        { herp: '1234' },
      ]

      testVars.forEach(vars => {
        this.configService.setVars(JSON.stringify(vars))
        expect(this.configService.getVars()).to.eql(vars)
      })
    })

    it(`sets (overwriting) and gets vars from object`, () => {
      const testVars = [
        { foo: 'bar' },
        { baz: { deeper: { deepest: [ 1, 2 ] } } },
        { herp: '1234' },
      ]

      testVars.forEach(vars => {
        this.configService.setVars(vars)
        expect(this.configService.getVars()).to.eql(vars)
      })
    })

    it(`assigns (merging) vars from JSON object strings and objects`, () => {
      const firstObj = { baz: { deeper: { deepest: [ 1, 2 ] } } }
      const secondObj = { foo: 'bar' }
      this.configService.assignVars(JSON.stringify(firstObj))
      this.configService.assignVars(secondObj)
      expect(this.configService.getVars()).to.eql({
        ...firstObj,
        ...secondObj,
      })
    })

    it(`sets an individual var`, () => {
      const testVars = [
        [ 'foo', 'bar' ],
        [ 'baz', { deeper: { deepest: [ 1, 2 ] } } ],
        [ 'herp', '1234' ],
      ]

      testVars.forEach(([ key, val ]) => {
        this.configService.set(key, val)
        expect(this.configService.get(key)).to.eql(val)
      })
    })

    it(`defaults get(var) to undefined`, () => {
      expect(this.configService.get()).to.eql(undefined)
    })
  })
})
