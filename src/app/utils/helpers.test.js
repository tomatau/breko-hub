import { compact } from './helpers'

describe('compact()', function() {
  it('removes falsey values from an array', () => {
    const messyArray = [
      true,
      false,
      0,
      -0,
      undefined,
      null,
      '',
      [],
      {},
      1,
      -1,
      'false',
      '0',
      NaN,
    ]
    const expected = [
      true,
      [],
      {},
      1,
      -1,
      'false',
      '0',
    ]
    const actual = compact(messyArray)
    expect(actual).to.eql(expected)
  })

  it('removes false values from an object', () => {
    const messyObject = {
      yes: true,
      no: false,
      nope: 0,
      nono: -0,
      not: null,
      never: undefined,
      nien: null,
      nowai: '',
      yar: [],
      yargh: {},
      yup: 1,
      yessir: -1,
      yok: 'false',
      yeee: '0',
      november: NaN,
    }
    const expected = {
      yes: true,
      yar: [],
      yargh: {},
      yup: 1,
      yessir: -1,
      yok: 'false',
      yeee: '0',
    }
    const actual = compact(messyObject)
    expect(actual).to.eql(expected)
  })
})
