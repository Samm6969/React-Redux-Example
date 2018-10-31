import React from 'react'
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

export const processColumns = columns =>
  mapTree(columns, 'children', column => {
    const {
      colId,
      id,
      field,
      dataIndex,
      headerName,
      text,
      hide,
      hidden,
      cellRendererFramework,
      renderer: ColumnRenderer,
      children,
      width,
      minWidth,
      maxWidth,
      cellStyle,
      textAlign,
      xtype = 'column',
      checkboxSelection,
      headerCheckboxSelection,
      // locked = false,
      // hideable = true,
      // groupable = false,
      // flex = 1,

      // xtype = 'column',
      // showInMenu = true,
    } = column

    let renderer
    if (typeof ColumnRenderer === 'function') {
      renderer = ({ value, data, ...rest }) => (
        <ColumnRenderer value={value} data={data} record={data} {...rest} />
      )
    }

    const style = cellStyle || {}

    const mappedColumn = {
      ...column,
      headerName: headerName || text || '',
      field: field || dataIndex || '',
      colId: colId || id,
      children: children ? processColumns(children) : undefined,
      cellRendererFramework: cellRendererFramework || renderer,
      hide: hide || hidden,
      width,
      minWidth,
      maxWidth,
      cellStyle: {
        ...style,
        textAlign,
      },
      checkboxSelection: checkboxSelection || xtype === 'checkcolumn',
      headerCheckboxSelection:
        headerCheckboxSelection || xtype === 'checkcolumn',
    }

    const blacklistedProperties = [
      'id',
      'text',
      'xtype',
      'hideable',
      'dataIndex',
      'showInMenu',
      'renderer',
    ]

    return _.pickBy(
      mappedColumn,
      (value, prop) => !blacklistedProperties.includes(prop),
    )
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
