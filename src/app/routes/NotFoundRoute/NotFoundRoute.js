import DocumentMeta from 'react-helmet'
import { hot } from 'react-hot-loader'

class NotFoundRoute extends React.Component {
  render() {
    return (
      <section className='NotFoundRoute'>
        <DocumentMeta>
          <title>Doesn&apos;t exist</title>
        </DocumentMeta>
        404, page not found
      </section>
    )
  }
}

export default hot(module)(NotFoundRoute)
