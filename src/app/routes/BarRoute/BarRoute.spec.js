import { WrappedComponent as BarRoute } from './BarRoute'

describe('BarRoute Component', function () {
  helpers.setupSnapshots(__filename)

  it('matches snapshot', () => {
    expect(
      snap(shallow(<BarRoute />))
    ).to.matchSnapshot()
  })
})
