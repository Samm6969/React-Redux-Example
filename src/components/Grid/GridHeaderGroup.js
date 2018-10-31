import React, { Component } from 'react'
import PropTypes from 'prop-types'

import s from './GridHeaderGroup.scss'
import { idSymbol, isColumnVisible } from './gridUtils'
import { columnShape } from './gridPropTypes'
import GridHeaderColumnBuilder from './GridHeaderColumnBuilder'
import GridCell from './GridCell'
// import PropTypes from 'prop-types'

class GridHeaderGroup extends Component {
  static propTypes = {
    /**
     * Row height
     */
    rowHeight: PropTypes.number.isRequired,
    ...columnShape,
  }

  render() {
    const { id, text, children, rowHeight } = this.props

    const visibleColumns = children.filter(isColumnVisible)

    // console.log(visibleColumns)

    if (visibleColumns.length === 0) {
      return null
    }

    return (
      <div
        id={id}
        key={id}
        className={s.group}
        // style={{ flex: `${visibleColumns.length} 1 auto` }}
      >
        <GridCell
          isHeader
          isGroup
          style={{
            minHeight: rowHeight,
            maxHeight: rowHeight,
            flex: '1 1 auto',
          }}
        >
          {text}
        </GridCell>
        <div className={s.children}>
          {visibleColumns.map((column, index, array) => {
            const first = index === 0
            const last = index === array.length - 1
            return (
              <GridHeaderColumnBuilder
                {...column}
                id={column[idSymbol]}
                key={column[idSymbol]}
                rowHeight={rowHeight}
                first={first}
                last={last}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default GridHeaderGroup
