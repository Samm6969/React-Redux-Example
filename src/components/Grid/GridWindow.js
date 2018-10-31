import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ScrollSyncPane } from 'react-scroll-sync'
import _ from 'lodash'

import s from './GridWindow.scss'

class GridWindow extends PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    rowHeight: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    rowCount: PropTypes.number.isRequired,
    cellRenderer: PropTypes.func.isRequired,
    columnWidth: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
      .isRequired,
    columnCount: PropTypes.number.isRequired,
    lockedColumnCount: PropTypes.number,
    onScroll: PropTypes.func,
    buffer: PropTypes.number,
  }

  static defaultProps = {
    lockedColumnCount: 0,
    buffer: 5,
  }

  throttleScroll = _.throttle(e => {
    const { scrollTop } = e.target
    // console.log(scrollTop, this.state.scrollTop)
    this.setState(
      state => (scrollTop !== state.scrollTop ? { scrollTop } : null),
    )
  }, 100)

  constructor(props) {
    super(props)
    this.lockedContainerNode = React.createRef()
    this.rowContainer = React.createRef()
  }

  state = {
    scrollTop: 0,
  }

  get hasLockedColumns() {
    const { lockedColumnCount } = this.props
    return lockedColumnCount !== 0
  }

  get startIndex() {
    const { rowHeight, buffer } = this.props
    const { scrollTop } = this.state

    return Math.max(0, Math.floor(scrollTop / rowHeight) - buffer)
  }

  get endIndex() {
    const { rowHeight, buffer, height, rowCount } = this.props
    const { scrollTop } = this.state
    const scrollBottom = scrollTop + height

    return Math.min(rowCount, Math.ceil(scrollBottom / rowHeight) + buffer)
  }

  get spacerHeight() {
    const { rowHeight } = this.props

    return this.startIndex * rowHeight
  }

  getlockedContainerWidth = () =>
    document.getElementById('header-locked-column-container').offsetWidth

  static getDerivedStateFromProps(props) {
    const { rowHeight, rowCount } = props
    const totalHeight = rowHeight * rowCount
    return {
      totalHeight,
    }
  }

  handleScroll = e => {
    const { onScroll } = this.props
    const { scrollLeft } = e.target

    e.persist()

    if (typeof onScroll === 'function') {
      onScroll(e)
    }

    const headerContainer = document.getElementById('header-column-container')
    if (headerContainer) {
      headerContainer.style.left = `-${scrollLeft}px`
    }

    this.throttleScroll(e)
  }

  rowRenderer = ({ rowIndex, style, columnStartIndex, columnEndIndex }) => {
    const { cellRenderer, columnWidth } = this.props

    const children = []

    for (let i = columnStartIndex; i < columnEndIndex; i++) {
      const columnIndex = i
      const width =
        typeof columnWidth === 'function'
          ? columnWidth({ columnIndex })
          : columnWidth
      const child = cellRenderer({
        style: {
          width,
          minWidth: width,
          maxWidth: width,
          overflow: 'hidden',
        },
        columnIndex,
        rowIndex,
      })
      children.push(child)
    }

    return (
      <div key={rowIndex} style={style}>
        {children}
      </div>
    )
  }

  render() {
    const {
      height,
      width,
      rowHeight,
      lockedColumnCount,
      columnCount,
    } = this.props
    const { totalHeight } = this.state
    const { hasLockedColumns, startIndex, endIndex } = this

    const rows = []
    const lockedRows = []

    let rowIndex = startIndex
    while (rowIndex < endIndex) {
      const props = {
        rowIndex,
        style: {
          height: rowHeight,
          maxHeight: rowHeight,
          minHeight: rowHeight,
          display: 'flex',
          position: 'relative',
        },
        columnStartIndex: lockedColumnCount,
        columnEndIndex: columnCount,
      }

      rows.push(this.rowRenderer(props))

      if (hasLockedColumns) {
        lockedRows.push(
          this.rowRenderer({
            ...props,
            columnStartIndex: 0,
            columnEndIndex: lockedColumnCount,
          }),
        )
      }
      // eslint-disable-next-line no-plusplus
      rowIndex++
    }

    const viewStyles = {
      height: totalHeight,
      position: 'relative',
    }

    return (
      <div
        style={{
          width,
          height,
          overflow: 'hidden',
          display: 'flex',
          position: 'relative',
        }}
      >
        {hasLockedColumns && (
          <ScrollSyncPane>
            <div
              id="locked-scroll-container"
              style={{
                height,
                overflow: 'auto',
                flexShrink: 0,
              }}
              className={s.lockedContainer}
            >
              <div
                style={{
                  ...viewStyles,
                }}
              >
                <div style={{ height: this.spacerHeight }} />
                {lockedRows}
              </div>
            </div>
          </ScrollSyncPane>
        )}
        <ScrollSyncPane>
          <div
            id="scroll-container"
            style={{
              height,
              overflow: 'auto',
            }}
            ref={this.rowContainer}
            onScroll={this.handleScroll}
          >
            <div
              style={{
                ...viewStyles,
              }}
            >
              <div style={{ height: this.spacerHeight }} />
              {rows}
            </div>
          </div>
        </ScrollSyncPane>
      </div>
    )
  }
}

export default GridWindow
