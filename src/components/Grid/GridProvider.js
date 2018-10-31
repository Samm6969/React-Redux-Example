import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { columnsPropType } from './gridPropTypes'
import { forEachTree, idSymbol, isEqual, processColumns } from './gridUtils'

export const { Provider, Consumer: GridConsumer } = createContext({})

class GridProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    // eslint-disable-next-line react/no-unused-prop-types
    columns: columnsPropType.isRequired,
    id: PropTypes.string.isRequired,
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

  toggleColumn = id => {
    this.setState(({ columns }) => {
      forEachTree(
        columns,
        'children',
        ({ [idSymbol]: columnId }, index, array, path) => {
          if (id === columnId) {
            const column = _.get(columns, path)
            _.set(columns, `${path}.hidden`, !column.hidden)
            return false
          }
          return true
        },
      )

      return {
        columns,
      }
    })
  }

  toggleAllColumnsInGroup = (groupPath, hidden) => {
    this.setState(({ columns }) => {
      forEachTree(
        columns,
        'children',
        ({ path: initialPath, hideable }, index, array, path) => {
          const isInGroup =
            initialPath.substr(0, groupPath.length) === groupPath &&
            path !== groupPath
          if (isInGroup && hideable) {
            _.set(columns, `${path}.hidden`, hidden)
          }
        },
      )

      return {
        columns,
      }
    })
  }

  render() {
    const { children, id } = this.props
    const { columns, initialColumns, columnProps } = this.state
    return (
      <Provider
        value={{
          columns,
          initialColumns,
          columnProps,
          id,
          toggleColumn: this.toggleColumn,
          toggleAllColumnsInGroup: this.toggleAllColumnsInGroup,
        }}
      >
        {children}
      </Provider>
    )
  }
}

export default GridProvider
