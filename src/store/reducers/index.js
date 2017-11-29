import { combineReducers } from 'redux';

import { bathReducer } from './bath.js';


const reducers = combineReducers({
  bath: bathReducer,
});

export default reducers;
