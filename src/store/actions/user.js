import API_BASE_URL from '../../resources/API_URL';

import {
  createSession,
  addToMyLexemes,
  removeFromMyLexemes,
  setUser,
} from './index.js';





export const login = (username, password) => {
  const url = `${API_BASE_URL}/login`;
  const params = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ name: username, password })
  }

  return fetch(url, params)
    .then( response => response.json() )
    .then( user => createSession(user) )
    .catch( error => { } );
}


export const fetchUser = (token) => (dispatch) => {
  const url = `${API_BASE_URL}/user/myId`;
  const params = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token },
  }

  return fetch(url, params)
    .then( response => response.json() )
    .then( user => dispatch(createSession({ ...user, token })) )
    .catch( error => { } );
}


export const changeLevel = (level) => (dispatch, getState) => {
  const url = `${API_BASE_URL}/user/myId`;
  const params = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + getState().user.token
    },
    body: JSON.stringify({ level })
  }

  return fetch(url, params)
    .then( response => response.json() )
    .then( user => dispatch(setUser(user)) )
    .catch( error => { } );
}


/*** USER'S CHOSEN LEXEMES ***/

export const fetchMyLexemes = () => (dispatch, getState) => {
  const url = `${API_BASE_URL}/user/myId/lexemes`;
  const params = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + getState().user.token }
  }

  return fetch(url, params)
    .then( response => response.json() )
    .then( lexemes => dispatch(addToMyLexemes(lexemes)) )
    .catch( error => { } );
}

export const addToBath = (lexemeId) => (dispatch, getState) => {
  const url = `${API_BASE_URL}/user/myId/lexemes/add/${lexemeId}`;
  const params = {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + getState().user.token }
  }

  return fetch(url, params)
    .then( response => response.json() )
    .then( lexeme => dispatch(addToMyLexemes([lexeme])) )
    .catch( error => { } );
}

export const removeFromBath = (lexemeId) => (dispatch, getState) => {
  const url = `${API_BASE_URL}/user/myId/lexemes/remove/${lexemeId}`;
  const params = {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + getState().user.token }
  }

  return fetch(url, params)
    .then( response => response.json() )
    .then( lexemeId => dispatch(removeFromMyLexemes(lexemeId)) )
    .catch( error => { } );
}
