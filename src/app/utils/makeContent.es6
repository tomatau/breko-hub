import React from 'react';
import {Provider} from 'react-redux';

export const makeContent = (routes, store) =>
  <div className='bh-app__root'>
    <Provider store={store}>
      {routes}
    </Provider>
  </div>
