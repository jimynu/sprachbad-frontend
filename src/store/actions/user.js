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


export const signup = (username, password) => {
  const url = `${API_BASE_URL}/signup`;
  const params = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ name: username, password })
  }

  return fetch(url, params)
    .then( response => {
      switch ( response.status ) {
        case 403:
          return 'Too many signup attempts. Try again in 10 minutes.'
        case 406:
          return 'Username must be compiled of letters only, the password of letters, -, _ and numbers.'
        case 409:
          return 'Username is already taken.'
        case 200:
          return 'Thanks for signing up! You can now login.'
        default:
          return;
      }
    })
    .then( message => message )
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


export const dumpNewbieState = () => (dispatch, getState) => {
  const url = `${API_BASE_URL}/user/myId`;
  const params = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + getState().user.token
    },
    body: JSON.stringify({ newbie: false })
  }

  return fetch(url, params)
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
    .then( lexeme => { // double -> 409 conflict
      if (!lexeme.error) dispatch(addToMyLexemes([lexeme]))
    })
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
    .then( lexemeId => { // not in list –> 409 conflict
      if (!lexemeId.error) dispatch(removeFromMyLexemes(lexemeId))
    })
    .catch( error => { } );
}
