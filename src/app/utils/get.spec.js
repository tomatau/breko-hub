import get from './get'

describe('Get', function () {
  beforeEach(()=> {
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

  it('returns undefined called with nothing', () => {
    const getDoesntExist = get('missing')
    expect(getDoesntExist(undefined)).to.eql(undefined)
  })

  it('returns undefined when property doesnt exist', ()=> {
    const getDoesntExist = get('missing')
    expect(
      getDoesntExist(this.object)
    ).to.eql(undefined)
  })

  it('gets a property from an object', ()=> {
    const getFoo = get('foo')
    expect(
      getFoo(this.object)
    ).to.eql(this.object.foo)
  })

  it('gets a deep property from an object by dot syntax', ()=> {
    const getDeeplyNested = get('bar.deeply.nested')
    expect(
      getDeeplyNested(this.object)
    ).to.eql(this.object.bar.deeply.nested)
  })

  it('sets default as second argument when supplied', () => {
    const or = { test: 'default value' }
    const getDoesntExist = get('missing', or)
    expect(
      getDoesntExist(undefined)
    ).to.eql(or)
  })
})
