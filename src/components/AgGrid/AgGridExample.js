import React, { Component } from 'react'
// import { render } from 'react-dom'
import { AgGridReact } from 'ag-grid-react'

function isFirstColumn(params) {
  const displayedColumns = params.columnApi.getAllDisplayedColumns()
  const thisIsFirstColumn = displayedColumns[0] === params.column
  return thisIsFirstColumn
}

class AgGrid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columnDefs: [
        {
          headerName: 'Athlete',
          field: 'athlete',
        },
        {
          headerName: 'Age',
          field: 'age',
        },
        {
          headerName: 'Country',
          field: 'country',
        },
        {
          headerName: 'Year',
          field: 'year',
        },
        {
          headerName: 'Date',
          field: 'date',
        },
        {
          headerName: 'Sport',
          field: 'sport',
        },
        {
          headerName: 'Gold',
          field: 'gold',
        },
        {
          headerName: 'Silver',
          field: 'silver',
        },
        {
          headerName: 'Bronze',
          field: 'bronze',
        },
        {
          headerName: 'Total',
          field: 'total',
        },
      ],
      defaultColDef: {
        width: 100,
        headerCheckboxSelection: isFirstColumn,
        checkboxSelection: isFirstColumn,
      },
      rowSelection: 'multiple',
      rowData: [],
    }
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi

    // const httpRequest = new XMLHttpRequest()
    const updateData = data => {
      this.setState({ rowData: data })
    }

    updateData([
      {
        athlete: 'athlete',
        age: 'age',
        country: 'country',
      },
    ])
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(document.getElementById('quickFilter').value)
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100%',
            paddingTop: '35px',
            boxSizing: 'border-box',
          }}
        >
          <div
            id="myGrid"
            style={{
              boxSizing: 'border-box',
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              enableColResize
              suppressRowClickSelection
              rowSelection={this.state.rowSelection}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
        <div style={{ position: 'absolute', top: '0', left: '0' }}>
          <input
            type="text"
            onInput={this.onQuickFilterChanged.bind(this)}
            id="quickFilter"
            placeholder="quick filter..."
          />
        </div>
      </div>
    )
  }
}

// eslint-disable-next-line
export { AgGrid }
