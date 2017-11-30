import {
  SET_SENTENCES,
  SAVE_SUCCESS,
} from '../actions';


export const bathReducer = (state = { current: -1 }, action) => {
  switch(action.type) {

    case SET_SENTENCES: {
      const newBath = {};
      newBath.current = 0;
      newBath.sentences = action.payload;
      return newBath;
    }

    case SAVE_SUCCESS: {
      const newState = { ...state };

      const currentSentence = { ...newState.sentences[newState.current] };
      currentSentence.success = action.payload.success;

      if (action.payload.success) {
        currentSentence.correctAnswers++;
      } else {
        currentSentence.wrongAnswers++;
        currentSentence.answer = action.payload.wrongAnswer;
      }

      newState.sentences[newState.current] = currentSentence;
      newState.current++;

      return newState;
    }

    // case REMOVE_REVIEW: {
    //   const newState = { ...state };
    //   const newReviewState = [ ...newState[action.restaurantId].reviews ];
    //   const deletedReviewId = parseInt( action.reviewId, 10 );
    //
    //   newState[action.restaurantId].reviews = newReviewState.filter( review => {
    //     return review.id !== deletedReviewId;
    //   });;
    //
    //   return newState;
    // }
    //
    //   return newState;
    // }

    default:
      return state;
  }
}
