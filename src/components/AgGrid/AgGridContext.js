import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
// import { Provider } from '../Grid/GridProvider'
import { columnsPropType } from './agGridPropTypes'
import { processColumns, isEqual } from './agGridUtils'

const { Provider: GridProvider, Consumer: AgGridConsumer } = createContext({})

class AgGridProvider extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    // eslint-disable-next-line react/no-unused-prop-types
    columns: columnsPropType.isRequired,
    onGridReady: PropTypes.func,
  }

  state = {}

  static getDerivedStateFromProps(props, state) {
    const { columns: nextColumns, id } = props
    const { columnProps } = state

    if (isEqual(nextColumns, columnProps)) {
      return null
    }

    const columns = processColumns(nextColumns, id)

    return {
      columns,
      initialColumns: columns,
      columnProps: nextColumns,
    }
  }

  // toggleColumn = id => {
  //   this.setState(({ columns }) => {
  //     forEachTree(
  //       columns,
  //       'children',
  //       ({ [idSymbol]: columnId }, index, array, path) => {
  //         if (id === columnId) {
  //           const column = _.get(columns, path)
  //           _.set(columns, `${path}.hidden`, !column.hidden)
  //           return false
  //         }
  //         return true
  //       },
  //     )
  //
  //     return {
  //       columns,
  //     }
  //   })
  // }

  // toggleAllColumnsInGroup = (groupPath, hidden) => {
  //   this.setState(({ columns }) => {
  //     forEachTree(
  //       columns,
  //       'children',
  //       ({ path: initialPath, hideable }, index, array, path) => {
  //         const isInGroup =
  //           initialPath.substr(0, groupPath.length) === groupPath &&
  //           path !== groupPath
  //         if (isInGroup && hideable) {
  //           _.set(columns, `${path}.hidden`, hidden)
  //         }
  //       },
  //     )
  //
  //     return {
  //       columns,
  //     }
  //   })
  // }

  toggleColumn = (colKey, visible) => {
    if (this.gridColumnApi) {
      this.gridColumnApi.setColumnVisible(colKey, visible)
    }
  }

  onGridReady = (...args) => {
    const { onGridReady } = this.props
    if (typeof onGridReady === 'function') {
      onGridReady(...args)
    }

    const [agGrid] = args

    this.setState({
      gridApi: agGrid.api,
      gridColumnApi: agGrid.columnApi,
    })
  }

  render() {
    const { children, id } = this.props
    const { gridApi, gridColumnApi, columns, columnProps } = this.state
    // console.log(processColumns(columns))
    return (
      <GridProvider
        value={{
          columns,
          // initialColumns,
          columnProps,
          gridApi,
          gridColumnApi,
          onGridReady: this.onGridReady,
          id,
          toggleColumn: this.toggleColumn,
          // toggleAllColumnsInGroup: this.toggleAllColumnsInGroup,
        }}
      >
        {children}
      </GridProvider>
    )
  }
}

export { AgGridProvider, AgGridConsumer }
