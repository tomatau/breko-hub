import fixtures, { transforms } from './index'

describe(`Fixtures Helper`, function () {
  it(`gives a useful error given an invalid fixture transform`, () => {
    const invalidTransformName = 'dont_exist'
    expect(
      () => fixtures(invalidTransformName)
    ).to.throw(
      `Invalid fixture transform: '${invalidTransformName}'`
    )
  })

  it(`returns available transform functions by key`, () => {
    Object.keys(transforms).forEach(key =>
      expect(
        fixtures(key)
      ).to.eql(
        transforms[key]()
      )
    )
  })

  it(`allows passing functions through`, () => {
    const testReturnVal = { test: 'return value' }
    expect(
      fixtures(
        () => testReturnVal
      )
    ).to.eql(testReturnVal)
  })

  it(`passes functions through from top to bottom`, () => {
    expect(
      fixtures(
        () => 123,
        x => x * 2,
        y => [ y, y ]
      )
    ).to.eql([
      123 * 2,
      123 * 2,
    ])
  })

  it(`passes error through if transform throws`, () => {
    const errMsg = 'message the transform threw'
    expect(
      () => fixtures(() => { throw new Error(errMsg) })
    ).to.throw(
      errMsg
    )
  })
})
