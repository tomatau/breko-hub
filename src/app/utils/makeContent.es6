import React from 'react';
import {Provider} from 'react-redux';
import DevTools from '~/src/app/components/containers/DevTools';

export const makeContent = (routes, store) =>
  <Provider store={store}>
    <div className='bh-app__root'>
      {routes}
      {(process.env.NODE_ENV !== 'development') ? null :
        <DevTools />}
    </div>
  </Provider>
