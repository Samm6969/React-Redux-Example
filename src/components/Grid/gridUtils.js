import { fromJS, is } from 'immutable'
import _ from 'lodash'

const idSymbol = Symbol('id')

export { idSymbol }

export const isEqual = (comp1, comp2) => {
  const immutableComp1 = fromJS(comp1)
  const immutableComp2 = fromJS(comp2)

  return is(immutableComp1, immutableComp2)
}

export const mapTree = (array, childPropertyName, func, path = '') =>
  _.map(array, (item, index, ...args) => {
    const children = item[childPropertyName]
    const itemPath = `${path}[${index}]`
    if (typeof children === 'undefined') {
      return func(item, index, ...args, itemPath)
    }
    return {
      ...func(item, index, ...args, itemPath),
      [childPropertyName]: mapTree(
        children,
        childPropertyName,
        func,
        `${itemPath}.${childPropertyName}`,
      ),
    }
  })

export const forEachTree = (array, childPropertyName, func, path = '') =>
  _.forEach(array, (item, index, ...args) => {
    const children = item[childPropertyName]
    const itemPath = `${path}[${index}]`

    const result = func(item, index, ...args, itemPath)

    if (typeof children !== 'undefined' && result !== false) {
      forEachTree(
        children,
        childPropertyName,
        func,
        `${itemPath}.${childPropertyName}`,
      )
    }

    return result
  })

export const processColumns = (columns, gridId) =>
  mapTree(columns, 'children', (column, index, array, path) => {
    const {
      id,
      dataIndex,
      text,
      width,
      hidden = false,
      locked = false,
      hideable = true,
      groupable = false,
      flex = 1,
      minWidth = 50,
      maxWidth,
      children,
      xtype = 'column',
      showInMenu = true,
    } = column
    const internalId = _.kebabCase(
      `${gridId}-${id ||
        dataIndex ||
        (typeof text === 'string' && text) ||
        _.uniqueId('column')}-column`,
    )

    return {
      ...column,
      text,
      width,
      hidden,
      locked,
      hideable,
      groupable,
      flex,
      minWidth,
      maxWidth,
      isGroup: Array.isArray(children),
      xtype,
      path,
      showInMenu,
      [idSymbol]: internalId,
    }
  })

export const isColumnVisible = ({ isGroup, hidden, hideable }) =>
  !isGroup && (!hidden || !hideable)

// export const getVisibleColumns = columns => {
//   const visibleColumns = []
//   forEachTree(columns, 'children', column => {
//     if (isColumnVisible(column)) {
//       visibleColumns.push(column)
//     }
//   })
//   return visibleColumns
// }

export const getVisibleColumns = columns => {
  const visibleColumns = []

  const forEach = array =>
    _.forEach(array, column => {
      const { children } = column

      if (isColumnVisible(column)) {
        visibleColumns.push(column)
      }

      if (typeof children !== 'undefined' && !column.hidden) {
        forEach(children)
      }
    })

  forEach(columns)

  return visibleColumns
}
