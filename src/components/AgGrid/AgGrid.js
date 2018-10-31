import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
// import './AgGrid.scss'
import { AgGridProvider, AgGridConsumer } from './AgGridContext'
import { columnsPropType } from './agGridPropTypes'

class AgGrid extends Component {
  static propTypes = {
    onGridReady: PropTypes.func,
    loading: PropTypes.bool,
    columnDefs: columnsPropType,
  }

  componentDidUpdate() {
    this.handleLoadingOverlay()
  }

  onGridReady = (...args) => {
    const { onGridReady } = this.props
    if (typeof onGridReady === 'function') {
      onGridReady(...args)
    }

    const [agGrid] = args

    this.gridApi = agGrid.api
    this.gridColumnApi = agGrid.columnApi

    this.handleLoadingOverlay()
  }

  handleLoadingOverlay = () => {
    const { loading } = this.props
    if (this.gridApi) {
      if (loading) {
        this.gridApi.showLoadingOverlay()
      } else {
        this.gridApi.hideOverlay()
      }
    }
  }

  render() {
    const { columnDefs, ...props } = this.props

    // console.log(props)

    return (
      <div
        className="ag-theme-balham"
        style={{ flex: 1 }}
        // Enables hot module reloading for grid
        // key={module.hot ? Date.now() : undefined}
      >
        <AgGridConsumer>
          {({ id, columns, onGridReady }) => (
            <AgGridReact
              id={id}
              enableColResize
              enableSorting
              // groupHideOpenParents
              suppressPropertyNamesCheck
              // autoGroupColumnDef={{
              //   // id: 'fund.provider.name',
              //   dataIndex: 'fund.provider.name',
              //   text: 'Fund Provider',
              //   hidden: true,
              //   rowGroup: true,
              //   width: 250,
              //   sort: 'asc',
              // }}
              autoGroupColumnDef={{
                sort: 'asc',
                hide: true,
                pinned: 'left',
              }}
              groupDefaultExpanded={-1}
              // groupUseEntireRow
              // groupIncludeFooter
              defaultColDef={{
                enableValue: false,
                enableRowGroup: true,
                enablePivot: false,
              }}
              rowHeight={32}
              {...props}
              // reactNext
              columnDefs={columnDefs || columns}
              onGridReady={(...args) => {
                onGridReady(...args)
                this.onGridReady(...args)
              }}
            />
          )}
        </AgGridConsumer>
      </div>
    )
  }
}

export {
  default as AgGridCustomizeColumnsModal,
} from './AgGridCustomizeColumnsModal'
export { default as AgGridCustomizeColumns } from './AgGridCustomizeColumns'
export { AgGridProvider, AgGridConsumer, AgGrid }
