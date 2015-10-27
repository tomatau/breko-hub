import {combineReducers} from 'redux';
import {errorReducers as error} from './errorReducers';
import {flashReducers as flash} from './flashReducers';

export default combineReducers({
  error,
  flash
});
