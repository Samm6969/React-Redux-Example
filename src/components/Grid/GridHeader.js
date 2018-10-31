import React, { Component } from 'react'
import PropTypes from 'prop-types'

import s from './GridHeader.scss'
import { columnsPropType } from './gridPropTypes'
import { idSymbol } from './gridUtils'
import GridHeaderColumnBuilder from './GridHeaderColumnBuilder'

class GridHeader extends Component {
  static propTypes = {
    /**
     * Columns to display
     */
    columns: columnsPropType,
    /**
     * Row height
     */
    rowHeight: PropTypes.number.isRequired,
    /**
     * Horizontal offset
     */
    scrollLeft: PropTypes.number,
    onHeaderRender: PropTypes.func,
    setColumnWidth: PropTypes.func,
  }

  componentDidMount() {
    this.onHeaderRender()
  }

  componentDidUpdate() {
    this.onHeaderRender()
  }

  onHeaderRender = () => {
    const { onHeaderRender } = this.props
    if (typeof onHeaderRender === 'function') {
      onHeaderRender()
    }
  }

  renderColumns = () => {
    const { columns, rowHeight, setColumnWidth } = this.props
    return columns.map((column, index, array) => {
      const id = column[idSymbol]
      const first = index === 0
      const last = index === array.length - 1
      return (
        <GridHeaderColumnBuilder
          key={id}
          {...column}
          id={id}
          rowHeight={rowHeight}
          first={first}
          last={last}
          setColumnWidth={setColumnWidth}
        />
      )
    })
  }

  render() {
    // console.log('GridHeader')
    const { scrollLeft } = this.props
    return (
      <div className={s.header}>
        <div
          className={s.scrollContainer}
          style={{
            left: -scrollLeft,
          }}
        >
          {this.renderColumns()}
        </div>
      </div>
    )
  }
}

export default GridHeader
