import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

const error = handleActions({

  SET_ERROR: (state, action) => ({
    ...state,
    errors: [
      ...state.errors,
      action.payload.error
    ]
  })

}, { errors: [] })

const flash = handleActions({

  REMOVE_FLASH: (state, action) => ({
    ...state,
    messages: state.messages.filter(
      flash => flash.id !== action.flash_id
    )
  })

}, { messages: [] })

export default combineReducers({
  error,
  flash
});
