import {
  setMyLexemes,
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
