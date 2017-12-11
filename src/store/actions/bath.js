import {
  setSentences,
  saveSuccess,
} from './index.js';

import API_BASE_URL from '../../resources/API_URL';


export const runBath = () => (dispatch, getState) => {
  const url = `${API_BASE_URL}/user/myId/lexemes/10`;
  const params = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + getState().user.token }
  }

  return fetch(url, params)
    .then( response => response.json() )
    .then( sentences => dispatch(setSentences(sentences)) )
    .catch( error => { } );
}

export const reportSuccess = (lexemeId, success, wrongAnswer) => (dispatch, getState) => {
  dispatch(saveSuccess( lexemeId, success, wrongAnswer ));  // saved to bath and user

  // save to DB
  const url = `${API_BASE_URL}/user/myId/lexemes/${lexemeId}/${success?'correct':'wrong'}`;
  const params = {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + getState().user.token }
  }

  return fetch(url, params)
    .then( response => { if(!response.ok) console.error(response.status) } )
    .catch( error => { } );
}
