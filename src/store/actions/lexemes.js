import {
  setLexemes,
} from './index.js';

import API_BASE_URL from '../../resources/API_URL';


export const fetchLexemes = () => {
  const url = `${API_BASE_URL}/lexemes/summary`;
  const params = { method: 'GET' }

  return fetch(url, params)
    .then( response => response.json() )
    .then( lexemes => setLexemes( lexemes ) )
    .catch( error => { } );
}
