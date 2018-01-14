import { hot } from 'react-hot-loader'
import { oopsRoute } from 'app/copy'

class OopsRoute extends React.Component {
  render() {
    return (
      <section className='OopsRoute'>
        {oopsRoute.content}
      </section>
    )
  }
}

export default hot(module)(OopsRoute)
