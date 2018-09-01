import React from 'react'
import NotFoundRoute from './NotFoundRoute'

describe(`NotFoundRoute Component`, function () {
  helpers.setupSnapshots(__filename)

  it(`matches snapshot`, () => {
    expect(
      snap(shallow(<NotFoundRoute />))
    ).to.matchSnapshot()
  })
})
