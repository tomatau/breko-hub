import React from 'react'
import HomeRoute from './HomeRoute'

describe(`HomeRoute Component`, function () {
  helpers.setupSnapshots(__filename)

  it(`matches snapshot`, () => {
    expect(
      snap(shallow(<HomeRoute />))
    ).to.matchSnapshot()
  })
})
