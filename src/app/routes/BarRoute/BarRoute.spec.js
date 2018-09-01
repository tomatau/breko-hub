import React from 'react'
import ConnectedComponent from './BarRoute'

const { WrappedComponent: BarRoute } = ConnectedComponent

describe(`BarRoute Component`, function () {
  helpers.setupSnapshots(__filename)

  it(`matches snapshot`, () => {
    expect(
      snap(shallow(<BarRoute />))
    ).to.matchSnapshot()
  })
})
