import {
  CREATE_SESSION,
  ADD_TO_MY_LEXEMES,
  REMOVE_FROM_MY_LEXEMES,
  SAVE_SUCCESS,
  SET_USER,
  REMOVE_SESSION,
} from '../actions';


export const userReducer = (state = { lexemes: [] }, action) => {
  switch(action.type) {

    case CREATE_SESSION: {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('id', action.payload._id);
      localStorage.setItem('name', action.payload.name);
      localStorage.setItem('level', action.payload.level);

      return {
        token: action.payload.token,
        id: action.payload._id,
        name: action.payload.name,
        level: action.payload.level,
        newbie: action.payload.newbie,
        lexemes: []
      };
    }

    case REMOVE_SESSION: {
      localStorage.clear();
      return { lexemes: [] };
    }

    case ADD_TO_MY_LEXEMES: {
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

      const lexemes = newState.lexemes.map( lexeme => {
        if (lexeme.lexeme._id === action.payload.lexemeId) {
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
