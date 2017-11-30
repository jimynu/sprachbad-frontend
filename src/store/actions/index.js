export const SET_SENTENCES = 'setSentences';
export const setSentences = (bath) => ({
  type: SET_SENTENCES,
  payload: bath
});

export const SAVE_SUCCESS = 'saveSuccess';
export const saveSuccess = (lexemeId, success, wrongAnswer) => ({
  type: SAVE_SUCCESS,
  payload: { lexemeId, success, wrongAnswer }
});
