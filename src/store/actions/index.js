/*** BATH ***/

export const SET_SENTENCES = 'setSentences';
export const setSentences = (bath) => ({
  type: SET_SENTENCES,
  payload: bath
});

export const SAVE_SUCCESS = 'saveSuccess'; // changes bath AND user state
export const saveSuccess = (lexemeId, success, wrongAnswer) => ({
  type: SAVE_SUCCESS,
  payload: { lexemeId, success, wrongAnswer }
});

export const RESET_CURRENT = 'resetCurrent';
export const resetCurrent = { type: RESET_CURRENT };

export const NEXT_SENTENCE = 'nextSentence';
export const nextSentence = { type: NEXT_SENTENCE };



/*** USER ***/

export const CREATE_SESSION = 'createSession';
export const createSession = (user) => ({
  type: CREATE_SESSION,
  payload: user
});

export const SET_USER = 'setUser';
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const ADD_TO_MY_LEXEMES = 'addToMyLexemes';
export const addToMyLexemes = (lexemes) => ({
  type: ADD_TO_MY_LEXEMES,
  payload: lexemes
});

export const REMOVE_FROM_MY_LEXEMES = 'removeFromMyLexemes';
export const removeFromMyLexemes = (lexemeId) => ({
  type: REMOVE_FROM_MY_LEXEMES,
  payload: lexemeId
});



/*** ALL REDUCERS ***/

export const REMOVE_SESSION = 'removeSession';
export const removeSession = { type: REMOVE_SESSION };



/*** LEXEMES ***/

export const SET_LEXEMES = 'setLexemes';
export const setLexemes = (lexemes) => ({
  type: SET_LEXEMES,
  payload: lexemes
});
