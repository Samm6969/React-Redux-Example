import React, { Component } from 'react'

import Grid from '../../components/Grid'
import * as Columns from '../../columns'
// import PropTypes from 'prop-types'

const columns = [
  Columns.RowSelectionColumn,
  Columns.BloombergIDColumn,
  Columns.TickerColumn,
  Columns.InvestorAccountColumn,
  Columns.OrderIDColumn,
  Columns.StatusColumn,
  Columns.TradeDateColumn,
  Columns.SettlementDateColumn,
  Columns.BondSettlementDateColumn,
  Columns.FundCodeColumn,
  Columns.SideColumn,
  Columns.QuantityColumn,
  Columns.QtyTypeColumn,
  Columns.OrderTypeColumn,
  Columns.CurrencyColumn,
]

class BloombergBSKTGrid extends Component {
  render() {
    return <Grid id="bloomberg-bskt-grid" columns={columns} />
  }
}

export default BloombergBSKTGrid
