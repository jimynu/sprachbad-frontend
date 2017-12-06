import {
  SET_MY_LEXEMES,
  REMOVE_FROM_MY_LEXEMES,
  SAVE_SUCCESS,
  SET_USER,
} from '../actions';


export const userReducer = (state = { lexemes: [] }, action) => {
  switch(action.type) {

    case SET_MY_LEXEMES: {
      const newState = { ...state };
      const lexemes = [ ...newState.lexemes, ...action.payload ]
      newState.lexemesLoaded = true; // necessary because ".length==0" could also mean they are fetched but user hasn't chosen any
      return { ...newState, lexemes };
    }

    case REMOVE_FROM_MY_LEXEMES: {
      const newState = { ...state };
      const lexemes = [ ...newState.lexemes ].filter( ({ lexeme }) => {
        return lexeme._id !== action.payload;
      });
      return { ...newState, lexemes };
    }

    case SAVE_SUCCESS: {
      if ( !state.lexemesLoaded ) return state; // not yet fetched

      const newState = { ...state };

      const lexemes = newState.lexemes.map( (lexeme) => {
        if (lexeme._id === action.payload.lexemeId) {
          if (action.payload.success) {
            lexeme.correctAnswers++;
            lexeme.progress ++;
          } else {
            lexeme.wrongAnswers++;
            lexeme.progress /= 2;
          }
        }
        return lexeme;
      });

      return { ...newState, lexemes };
    }

    case SET_USER: {
      const { _id: id, name, newbie, level } = action.payload;
      return { ...state, id, name, newbie, level };
    }

    default:
      return state;
  }
}
