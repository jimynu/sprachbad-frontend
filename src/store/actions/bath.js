// import {
//   createSession
// } from './index.js';
//
// import API_BASE_URL from '../../resources/API';
//
//
//
// export const editReview = (rating, text, restaurantId, reviewId, token) => {
//   const url = API_BASE_URL + '/restaurants/' + restaurantId + '/review/' + reviewId;
//   const params = {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json',
//       'Authorization': 'Bearer ' + token
//     },
//     body: JSON.stringify({
//       "rating": rating,
//       "text": text
//     })
//   }
//
//   return fetch(url, params)
//     .then( response => response.json() )
//     .then( review => changeReview( restaurantId, review ) )
//     .catch( error => { } );
// }
