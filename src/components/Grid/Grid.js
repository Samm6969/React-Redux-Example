import React, { Fragment, PureComponent, forwardRef } from 'react'
import { LoadingIndicator } from '@fc/react-playbook'
import ReactResizeDetector from 'react-resize-detector'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Grid as GridWindow,
  ScrollSync,
  // defaultCellRangeRenderer,
} from 'react-virtualized'

import s from './Grid.scss'
import GridHeader from './GridHeader'
// import GridWindow from './GridWindow'
import GridCell from './GridCell'
import { CheckColumnProvider, CheckColumnConsumer } from './CheckColumnContext'
import GridProvider, { GridConsumer } from './GridProvider'

import { isUndefinedNull } from '../../utils/utils'
import CheckColumn from './CheckColumn'
import { getVisibleColumns, idSymbol } from './gridUtils'
import { columnsPropType } from './gridPropTypes'

class Grid extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    rowHeight: PropTypes.number,
    columns: columnsPropType.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    emptyCellText: PropTypes.node,
    onSelectionChanged: PropTypes.func,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    recordId: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      .isRequired,
  }

  static defaultProps = {
    rowHeight: 32,
    emptyCellText: '--',
    data: [],
  }

  recordIdProp = Symbol('recordId')

  constructor(props) {
    super(props)
    this.node = React.createRef()
    this.gridBody = React.createRef()
    const { width, height } = this.props
    this.state.width = width
    this.state.height = height
  }

  state = {
    selected: {},
    data: [],
    visibleColumns: [],
    headerHasRendered: false,
    hoverRow: null,
    // columnWidths: new Map(),
  }

  static getDerivedStateFromProps(props) {
    const { columns, data: nextData } = props

    return {
      visibleColumns: getVisibleColumns(columns),
      data: nextData,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.visibleColumns.length !== this.state.visibleColumns.length &&
      this.gridBody.current
    ) {
      this.gridBody.current.recomputeGridSize()
    }
  }

  onResizeGrid = (fillWidth, fillHeight) => {
    const { width, height } = this.props
    this.setState({
      width: width || fillWidth,
      height: height || fillHeight,
    })
  }

  onResizeScrollWindow = (fillWidth, fillHeight) => {
    this.setState({
      scrollWindowWidth: fillWidth,
      scrollWindowHeight: fillHeight,
    })
  }

  onSelectionChanged = ({ column, record }) => {
    const { onSelectionChanged } = this.props
    if (typeof onSelectionChanged === 'function') {
      const { selected } = this.state
      onSelectionChanged(selected, column, record)
    }
  }

  onScrollbarPresenceChange = ({
    horizontal: hasHorizontalScrollbar,
    size: scrollbarSize,
    vertical: hasVerticalScrollbar,
  }) => {
    this.setState({
      hasHorizontalScrollbar,
      scrollbarSize,
      hasVerticalScrollbar,
    })
  }

  onSelect = ({ column, record }) => {
    const { onSelect } = this.props

    if (typeof onSelect === 'function') {
      onSelect(record, column)
    }

    const { [idSymbol]: columnId, id: headerId } = column
    const id = columnId || headerId
    this.setState(
      ({ selected }) => {
        // eslint-disable-next-line
        let currentSelection = selected[id] || []
        if (!record) {
          const { data } = this.state
          currentSelection = [...data]
        } else {
          currentSelection.push(record)
        }
        return {
          selected: {
            ...selected,
            [id]: currentSelection,
          },
        }
      },
      () => {
        this.onSelectionChanged({ column, record })
      },
    )
  }

  onDeselect = ({ column, record }) => {
    const { onDeselect } = this.props
    if (typeof onDeselect === 'function') {
      onDeselect(column, record)
    }

    const { [idSymbol]: columnId, id: headerId } = column
    const id = columnId || headerId
    this.setState(
      ({ selected }) => {
        let currentSelection = selected[id] || []
        if (record) {
          _.remove(
            currentSelection,
            selection =>
              this.getRecordId(selection) === this.getRecordId(record),
          )
        } else {
          currentSelection = []
        }
        return {
          selected: {
            ...selected,
            [id]: currentSelection,
          },
        }
      },
      () => {
        this.onSelectionChanged({ column, record })
      },
    )
  }

  onHeaderRender = () => {
    this.setState(({ headerHasRendered }) => {
      if (!headerHasRendered) {
        return {
          headerHasRendered: true,
        }
      }
      return null
    })
  }

  getColumnWidth = ({ index }) => {
    if (typeof document === 'undefined') {
      return 'auto'
    }

    const { visibleColumns } = this.state
    const column = visibleColumns[index]

    if (!column) {
      return null
    }

    if (typeof column.width === 'number') {
      return column.width
    }

    const node = document.getElementById(column[idSymbol])

    if (!node) {
      return null
    }

    return node.offsetWidth
  }

  getRowHeight = () => {
    const { rowHeight } = this.props
    return rowHeight
  }

  defaultRenderer = value => {
    const { emptyCellText } = this.props
    if (typeof value === 'object' || isUndefinedNull(value)) {
      return emptyCellText
    }
    return value
  }

  getRecordId = record => {
    const { recordId } = this.props
    if (typeof recordId === 'function') {
      return recordId(recordId)
    }
    return _.get(record, recordId)
  }

  // cellRangeRenderer = props => {
  //   const children = defaultCellRangeRenderer(props)
  //   const isGroupRow = []
  //   return children.map(x => {
  //     const [rowIndex] = x.key.split('-')
  //     if (Number(rowIndex) % 2 === 0 && isGroupRow.includes(rowIndex)) {
  //       return null
  //     }
  //     isGroupRow.push(rowIndex)
  //     return x
  //   })
  // }

  cellRenderer = ({ columnIndex, rowIndex, style, key }) => {
    const { data, visibleColumns, hoverRow } = this.state
    if (data.length === 0) {
      return null
    }
    const column = visibleColumns[columnIndex]
    const { dataIndex, renderer: ColumnRenderer, xtype, textAlign } = column
    const record = data[rowIndex]
    const value = _.get(record, dataIndex)

    // const even = rowIndex % 2 === 0
    //
    // if (even) {
    //   return (
    //     <div key={key} style={{ ...style, width: '100%', left: 0 }}>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //       minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //       aliquip ex ea commodo consequat. Duis aute irure dolor in
    //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    //       culpa qui officia deserunt mollit anim id est laborum.
    //     </div>
    //   )
    // }

    return (
      <GridCell
        key={key}
        style={style}
        isOddRow={rowIndex % 2 !== 0}
        isHovering={hoverRow === rowIndex}
        isCheckColumn={xtype === 'checkcolumn'}
        textAlign={textAlign}
        // onMouseOver={() => {
        //   this.setState(
        //     ({ hoverRow: prevHoverRow }) => {
        //       if (prevHoverRow === rowIndex) {
        //         return null
        //       }
        //       this.gridBody.current.forceUpdate()
        //       return { hoverRow: rowIndex }
        //     },
        //     () => {},
        //   )
        // }}
        onFocus={() => {}}
      >
        {xtype === 'column' &&
          typeof ColumnRenderer === 'function' && (
            <ColumnRenderer
              value={value}
              record={record}
              dataIndex={dataIndex}
              column={column}
              columnIndex={columnIndex}
              getRecordId={this.getRecordId}
            />
          )}
        {xtype === 'column' &&
          typeof ColumnRenderer !== 'function' &&
          this.defaultRenderer(value)}
        {xtype === 'checkcolumn' && (
          <CheckColumnConsumer>
            {props => (
              <CheckColumn
                value={value}
                record={record}
                dataIndex={dataIndex}
                column={column}
                columnIndex={columnIndex}
                {...props}
              />
            )}
          </CheckColumnConsumer>
        )}
      </GridCell>
    )
  }

  // setColumnWidth = (id, width) => {
  //   this.setState(({ columnWidths }) => {
  //     const preWidth = columnWidths.get(id)
  //     if (!preWidth || preWidth !== width) {
  //       columnWidths.set(id, width)
  //       return {
  //         columnWidths,
  //       }
  //     }
  //     return null
  //   })
  // }

  render() {
    const { id, rowHeight, isLoading, columns } = this.props
    const {
      selected,
      data,
      width,
      height,
      scrollWindowWidth,
      scrollWindowHeight,
      hasHorizontalScrollbar,
      scrollbarSize,
      hasVerticalScrollbar,
      headerHasRendered,
      visibleColumns,
    } = this.state
    const hasData = data.length !== 0
    const style = {
      width,
      height,
    }

    return (
      <Fragment>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResizeGrid}
        />
        <CheckColumnProvider
          value={{
            onSelectionChanged: this.onSelectionChanged,
            onSelect: this.onSelect,
            onDeselect: this.onDeselect,
            selected,
            totalCount: data.length,
            getRecordId: this.getRecordId,
          }}
        >
          <ScrollSync>
            {({ onScroll, scrollLeft }) => (
              <div id={id} ref={this.node} style={style} className={s.grid}>
                <GridHeader
                  columns={columns}
                  rowHeight={rowHeight}
                  onHeaderRender={this.onHeaderRender}
                  scrollLeft={scrollLeft}
                  hasHorizontalScrollbar={hasHorizontalScrollbar}
                  scrollbarSize={scrollbarSize}
                  hasVerticalScrollbar={hasVerticalScrollbar}
                  setColumnWidth={this.setColumnWidth}
                />
                <div
                  className={s.body}
                  // onMouseLeave={() => {
                  //   this.setState({ hoverRow: null })
                  //   if (this.gridBody.current) {
                  //     this.gridBody.current.forceUpdate()
                  //   }
                  // }}
                >
                  <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={this.onResizeScrollWindow}
                  />
                  {headerHasRendered &&
                    hasData && (
                      <GridWindow
                        ref={this.gridBody}
                        width={scrollWindowWidth || 0}
                        height={scrollWindowHeight || 0}
                        cellRenderer={this.cellRenderer}
                        columnWidth={this.getColumnWidth}
                        columnCount={visibleColumns.length}
                        rowHeight={this.getRowHeight}
                        rowCount={data.length}
                        // cellRangeRenderer={this.cellRangeRenderer}
                        onScroll={onScroll}
                        onScrollbarPresenceChange={
                          this.onScrollbarPresenceChange
                        }
                      />
                    )}
                  {isLoading && <LoadingIndicator />}
                </div>
              </div>
            )}
          </ScrollSync>
        </CheckColumnProvider>
      </Fragment>
    )
  }
}

export {
  default as GridCustomizeColumnsModal,
} from './GridCustomizeColumnsModal'
export { GridProvider, GridConsumer }
export default forwardRef((props, ref) => (
  <GridConsumer>
    {({ columns, id }) => (
      <Grid columns={columns} ref={ref} id={id} {...props} />
    )}
  </GridConsumer>
))
