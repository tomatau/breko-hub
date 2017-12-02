import { Route } from 'react-router-dom'
import CodeSplit from 'app/components/CodeSplit'

const CodeSplitRoute = ({ load, ...props }) => (
  <Route
    {...props}
    render={() => (
      <CodeSplit load={load}>
        {Component => Component && <Component />}
      </CodeSplit>
    )}
  />
)

export default CodeSplitRoute
