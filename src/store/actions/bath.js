import {
  setSentences,
  saveSuccess,
} from './index.js';

import API_BASE_URL from '../../resources/API_URL';
import DEFAULT_USER from '../../resources/defaultUser';


export const runBath = (user = DEFAULT_USER) => {
  const url = `${API_BASE_URL}/user/${user}/lexemes/10`;
  const params = { method: 'GET' }

  return fetch(url, params)
    .then( response => response.json() )
    .then( sentences => setSentences( sentences ) )
    .catch( error => { } );
}

export const reportSuccess = (lexemeId, success, wrongAnswer, user = DEFAULT_USER) => {
  const url = `${API_BASE_URL}/user/${user}/lexemes/${lexemeId}/${success?'correct':'wrong'}`;
  const params = { method: 'PUT' }

  return fetch(url, params)
    .then( response => {
      if (response.ok) {
        return saveSuccess( lexemeId, success, wrongAnswer );
      } else {
        return {message: 'error: ' + response.status};
      }
    })
    .catch( error => { } );
}






// model

// export const runBath = (user = DEFAULT_USER) => {
//   const url = API_BASE_URL + 'user/' + user + '/lexemes/10';
//   const params = {
//     method: 'GET',
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
//     .then( bath => runBathAction( bath ) )
//     .catch( error => { } );
// }
