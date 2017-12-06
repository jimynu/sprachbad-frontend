import {
  setMyLexemes,
  removeFromMyLexemes,
  setUser,
} from './index.js';

import API_BASE_URL from '../../resources/API_URL';
import DEFAULT_USER from '../../resources/defaultUser';


export const fetchMyLexemes = (user = DEFAULT_USER) => {
  const url = `${API_BASE_URL}/user/${user}/lexemes`;
  const params = { method: 'GET' }

  return fetch(url, params)
    .then( response => response.json() )
    .then( lexemes => setMyLexemes( lexemes ) )
    .catch( error => { } );
}

export const fetchUser = (user = DEFAULT_USER) => {
  const url = `${API_BASE_URL}/user/${user}`;
  const params = { method: 'GET' }

  return fetch(url, params)
    .then( response => response.json() )
    .then( user => setUser( user ) )
    .catch( error => { } );
}


export const changeLevel = (level, user = DEFAULT_USER) => {
  const url = `${API_BASE_URL}/user/${user}`;
  const params = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      // 'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ level })
  }

  return fetch(url, params)
    .then( response => response.json() )
    .then( user => setUser( user ) )
    .catch( error => { } );
}

export const addToBath = (lexemeId, user = DEFAULT_USER) => {
  const url = `${API_BASE_URL}/user/${user}/lexemes/add/${lexemeId}`;
  const params = { method: 'PUT' }

  return fetch(url, params)
    .then( response => response.json() )
    .then( lexeme => setMyLexemes([lexeme]) )
    .catch( error => { } );
}

export const removeFromBath = (lexemeId, user = DEFAULT_USER) => {
  const url = `${API_BASE_URL}/user/${user}/lexemes/remove/${lexemeId}`;
  const params = { method: 'PUT' }

  return fetch(url, params)
    .then( response => response.json() )
    .then( lexemeId => removeFromMyLexemes(lexemeId) )
    .catch( error => { } );
}
