import {
  SET_SENTENCES,
  SAVE_SUCCESS,
  RESET_CURRENT,
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

    case SAVE_SUCCESS: {
      const newState = { ...state };
      const progress = { ...state.progress };

      const currentSentence = { ...newState.sentences[newState.current] };
      currentSentence.success = action.payload.success;

      if (action.payload.success) {
        currentSentence.correctAnswers++;
        progress.correct++;
      } else {
        currentSentence.wrongAnswers++;
        currentSentence.answer = action.payload.wrongAnswer;
        progress.wrong++;
      }

      newState.sentences[newState.current] = currentSentence;
      newState.current++;
      newState.progress = progress;

      if (newState.current === newState.sentences.length) newState.finished = true;

      return newState;
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
