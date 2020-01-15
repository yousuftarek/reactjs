import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import authReducer from './authReducer';

export default combineReducers({
  books: bookReducer,
  auth: authReducer
});