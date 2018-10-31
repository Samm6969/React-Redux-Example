import _ from 'lodash'

export const gridPath = id => `grid.${id}`

export const getGridProps = id => state => _.get(state, `${gridPath(id)}.props`)
