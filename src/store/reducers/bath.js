// import {
//   SET_RESTAURANT_LIST,
//   ADD_REVIEW,
//   REMOVE_REVIEW,
//   CHANGE_REVIEW,
// } from '../actions';


export const bathReducer = (state = {}, action) => {
  switch(action.type) {


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
