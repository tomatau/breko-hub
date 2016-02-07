import DocumentMeta from 'react-document-meta'

class BarRoute extends React.Component {
  render() {
    return (
      <section>
        <DocumentMeta extend {...{ title: 'Breko Hub - Bar' }} />
        Bar
      </section>
    )
  }
}

export default BarRoute
