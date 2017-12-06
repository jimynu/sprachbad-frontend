import {
  SET_LEXEMES,
} from '../actions';


export const lexemeReducer = (state = [], action) => {
  switch(action.type) {

    case SET_LEXEMES: {
      return action.payload;
    }

    default:
      return state;
  }
}
