import get from './get'

describe('Get', function() {
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

  it('should return undefined when property doesnt exist', ()=> {
    expect(get('missing')(this.object)).to.eql(undefined)
  })

  it('should get a property from an object', ()=> {
    expect(get('foo')(this.object)).to.eql(this.object.foo)
  })

  it('should get a deep property from an object by array syntax', ()=> {
    expect(
      get([ 'bar', 'deeply' ])(this.object)
    ).to.eql(this.object.bar.deeply)
  })

  it('should get a deep property from an object by dot syntax', ()=> {
    expect(
      get('bar.deeply.nested')(this.object)
    ).to.eql(this.object.bar.deeply.nested)
  })
})
