import { Provider } from 'react-redux'

export const makeContent = (content, store) =>
  <Provider store={store}>
    {content}
  </Provider>
