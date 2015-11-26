import React from 'react'

class FooRoute extends React.Component {

  static loadProps(params, cb) {
    cb(null, {
      foo: 'BAAARRR',
    })
  }

  render() {
    return (
      <div>
        Foo
      </div>
    )
  }
}

export default FooRoute
