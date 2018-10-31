import { INITIALIZE_GRID } from './gridActions'

const gridReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_GRID: {
      const { id, initialState } = action
      const { columns } = initialState
      return {
        [id]: {
          props: {
            id,
            columns,
          },
          initialState: {
            id,
            ...initialState,
          },
        },
      }
    }
    default:
      return state
  }
}

export default gridReducer
