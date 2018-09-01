import React from 'react'
import OopsRoute from './OopsRoute'

describe(`OopsRoute Component`, function () {
  helpers.setupSnapshots(__filename)

  it(`matches snapshot`, () => {
    expect(
      snap(shallow(<OopsRoute />))
    ).to.matchSnapshot()
  })
})
