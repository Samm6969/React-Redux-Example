export const ADD_CHAPTER = 'ADD_CHAPTER'

export const addChapterAction = (id, name) => ({
  type: ADD_CHAPTER,
  id,
  name,
})
