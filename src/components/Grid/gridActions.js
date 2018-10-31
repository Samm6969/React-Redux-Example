export const INITIALIZE_GRID = 'INITIALIZE_GRID'

export const initializeGrid = (id, initialState) => ({
  type: INITIALIZE_GRID,
  id,
  initialState,
})
