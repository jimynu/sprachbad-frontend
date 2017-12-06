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
export const resetCurrent = {
  type: RESET_CURRENT
};



/*** USER ***/

export const SET_MY_LEXEMES = 'setMyLexemes';
export const setMyLexemes = (lexemes) => ({
  type: SET_MY_LEXEMES,
  payload: lexemes
});
<<<<<<< HEAD
=======

export const REMOVE_FROM_MY_LEXEMES = 'removeFromMyLexemes';
export const removeFromMyLexemes = (lexemeId) => ({
  type: REMOVE_FROM_MY_LEXEMES,
  payload: lexemeId
});

export const SET_USER = 'setUser';
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});



/*** LEXEMES ***/

export const SET_LEXEMES = 'setLexemes';
export const setLexemes = (lexemes) => ({
  type: SET_LEXEMES,
  payload: lexemes
});
>>>>>>> 4b367c170e8001dbad819a8d49af8cdac32ba9cb
