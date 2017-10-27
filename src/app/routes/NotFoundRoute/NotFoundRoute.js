import DocumentMeta from 'react-helmet'

export default class NotFoundRoute extends React.Component {
  render() {
    return (
      <section className='NotFoundRoute'>
        <DocumentMeta>
          <title>Doesn't exist</title>
        </DocumentMeta>
        404, page not found
      </section>
    )
  }
}
