import {
  SET_SENTENCES,
  SAVE_SUCCESS,
  RESET_CURRENT,
  NEXT_SENTENCE,
} from '../actions';


export const bathReducer = (state = { current: -1 }, action) => {
  switch(action.type) {

    case SET_SENTENCES: {
      const newState = {}; // replaces old bath!
      newState.current = 0;
      newState.sentences = action.payload;
      newState.progress = { correct: 0, wrong: 0, total: newState.sentences.length };

      const sentences = [ ...newState.sentences ];
      sentences.map( sentence => {
        const task = { ...sentence.task }
        const { q, a } = task;

        const pos = q.indexOf(a);
        const left = q.substring( 0, pos );
        const right = q.substring( pos + a.length );

        const qSplit = [left, right];

        sentence.task = { ...task, q: qSplit };
        return sentence;
      })

      return newState;
    }

    case NEXT_SENTENCE: {
      const newState = { ...state };
      newState.current++;
      if (newState.current === newState.sentences.length) newState.finished = true;
      return newState;
    }

    case SAVE_SUCCESS: {
      const newState = { ...state };
      const progress = { ...state.progress };

      console.log(action.payload);

      const sentences = newState.sentences.map( lexeme => {
        if (lexeme.lexemeId === action.payload.lexemeId) {
          if (action.payload.success) {
            lexeme.correctAnswers++;
            progress.correct++;
          } else {
            lexeme.wrongAnswers++;
            lexeme.answer = action.payload.wrongAnswer;
            progress.wrong++;
          }
          lexeme.success = action.payload.success;
        }
        return lexeme;
      });

      return { ...newState, sentences, progress };
    }

    case RESET_CURRENT: {
      const newState = { ...state };
      newState.current = -1;
      return newState;
    }

    default:
      return state;
  }
}
