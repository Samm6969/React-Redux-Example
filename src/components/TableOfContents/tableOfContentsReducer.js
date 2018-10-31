import { ADD_CHAPTER } from './tableOfContentsActions'

const tableOfContentsReducer = (state = {}, action) => {
  const { id, name, type } = action
  switch (type) {
    case ADD_CHAPTER: {
      const tableOfContents = state[id] ? state[id] : []
      tableOfContents.push({
        name,
        active: false,
      })
      return {
        ...state,
        [id]: tableOfContents,
      }
    }
    default:
      return state
  }
}

export default tableOfContentsReducer
