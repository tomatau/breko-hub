
import {defaultMiddleware, makeCreateStore} from '~/src/app/store/configureStore';
import rootReducer from '~/src/app/reducers';

export default function *(next) {
  const error = {};
  const {state:initialState} = this;

  const middleware = [
    ...defaultMiddleware,
    // server only middleware
  ]
  this.store = makeCreateStore(middleware)(rootReducer, {
    error,
    ...initialState || {}
  })
  yield next;
}
