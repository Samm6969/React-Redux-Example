import * as Columns from '../../columns'

/*
STATUS <COLOR BASED ON THIS>
ORDER ID <Open Order Details Modal>
SUBMIT DATE
TRADE DATE
INVESTOR ACCOUNT
INVESTOR  UID (Name)
FUND NAME <Open Fund  Details Modal>
SIDE
QUANTITY
CURRENCY
QUANTITY TYPE
SETTLEMENT DATE
CASH SETTLEMENT STATUS
CUSTODY SETTLEMENT STATUS

TODO COLS THAT ARE DISABLED BY DEFAULT
INVESTOR GROUP
FUND PROVIDER
FUND LONG NAME <Open Fund Details Modal>

TODO USE APPROVAL REQUIRED TO SHOW X/Y APPROVALS NEEDED
 */

export default [
  Columns.OrderStatusColumn,
  Columns.OrderIdColumn,
  Columns.SubmitDateColumn,
  Columns.TradeDateColumn,
  Columns.InvestorAccountColumn,
  Columns.InvestorColumn,
  { ...Columns.FundNameColumn, dataIndex: 'order.fundAccount.fund.name' },
  {
    ...Columns.FundLongNameColumn,
    dataIndex: 'order.fundAccount.fund.longName',
    width: 200,
  },
  Columns.TradeSideColumn,
  Columns.QuantityColumn,
  Columns.OrderCurrencyColumn,
  Columns.QuantityTypeColumn,
  Columns.SettlementDateColumn,
  Columns.CashSettlementStatusColumn,
  Columns.CustodySettlementStatusColumn,

  /* hidden
  Columns.InvestorGroupColumn
  Columns.FundProviderColumn
  Columns.FundLongNameColumn
   */
]
