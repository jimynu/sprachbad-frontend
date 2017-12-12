import {
  SET_LEXEMES,
  REMOVE_SESSION,
} from '../actions';


export const lexemeReducer = (state = [], action) => {
  switch(action.type) {

    case SET_LEXEMES: {
      return action.payload;
    }

    case REMOVE_SESSION: {
      return [];
    }

    default:
      return state;
  }
}
