import { combineReducers } from 'redux';

import { bathReducer } from './bath';
import { userReducer } from './user';


const reducers = combineReducers({
  bath: bathReducer,
  user: userReducer,
});

export default reducers;
