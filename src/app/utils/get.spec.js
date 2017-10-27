import get from './get'

describe(`Get Helper`, function () {
  beforeEach(() => {
    this.object = {
      foo: 'bar',
      bar: {
        deeply: {
          nested: 'value',
          another: 1,
        },
      },
    }
  })

  it(`returns undefined when location isnt a string`, () => {
    expect(get(undefined)('anything')).to.eql(undefined)
    expect(get(123)('anything')).to.eql(undefined)
    expect(get({})('anything')).to.eql(undefined)
  })

  it(`returns when given undefined`, () => {
    expect(get('missing')(undefined)).to.eql(undefined)
  })

  it(`returns undefined when property doesnt exist`, () => {
    expect(get('missing')(this.object)).to.eql(undefined)
  })

  it(`gets a property from an object`, () => {
    expect(get('foo')(this.object)).to.eql(this.object.foo)
  })

  it(`gets a deep property from an object by dot syntax`, () => {
    expect(
      get('bar.deeply.nested')(this.object)
    ).to.eql(this.object.bar.deeply.nested)
  })

  it(`sets default as second argument when supplied`, () => {
    const or = { test: 'default value' }
    const getDoesntExist = get('missing', or)
    expect(
      getDoesntExist(undefined)
    ).to.eql(or)
  })
})
