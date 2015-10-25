import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

const error = handleActions({

  SET_ERROR: (state, action) => ({
    ...state,
    message: action.payload.error
  })

}, {})

export default combineReducers({
  error
});
