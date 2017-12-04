import {
  SET_MY_LEXEMES,
  SAVE_SUCCESS,
} from '../actions';


export const userReducer = (state = {}, action) => {
  switch(action.type) {

    case SET_MY_LEXEMES: {
      const newState = { ...state };
      newState.lexemes = action.payload;
      return newState;
    }

    case SAVE_SUCCESS: {
      if ( !state.lexemes ) return state; // not yet fetched

      const newState = { ...state };

      return newState.lexemes.map( (lexeme) => {

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



      // const lexemes = { ...newState.lexemes };


      // const currentLexeme = newState.lexemes.find( ({_id}) => _id === action.payload.lexemeId )
      //
      //   if (action.payload.success) {
      //     currentLexeme.correctAnswers++;
      //     currentLexeme.progress ++;
      //   } else {
      //     currentLexeme.wrongAnswers++;
      //     currentLexeme.progress =/ 2;
      //   }




      // const currentSentence = { ...newState.lexemes[] };
      // currentSentence.success = action.payload.success;
      //
      // const lexemes = { ...state.lexemes };
      // const lexemes.map( lexeme => {
      //   lexeme.progress
      // });
      // newState.lexemes = lexemes;
    }

    default:
      return state;
  }
}
