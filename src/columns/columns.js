import UpdateDateColumnRenderer from './UpdateDateColumnRenderer'
import TradingWindowsColumnRenderer from './TradingWindowsColumnRenderer'
import PercentageOwnedColumnRenderer from './PercentageOwnedColumnRenderer'
import AUMColumnRenderer from './AUMColumnRenderer'
import LiquidityColumnRenderer from './LiquidityColumnRenderer'
import BalanceColumnRenderer from './BalanceColumnRenderer'
import FundNameColumnRenderer from './FundNameColumnRenderer'
import OrderStatusColumnRenderer from './OrderStatusColumnRenderer'
import OrderIdColumnRenderer from './OrderIdColumnRenderer'
import DateColumnRenderer from './DateColumnRenderer'
import CapitalCaseColumnRenderer from './CapitalCaseColumnRenderer'
import SettlementStatusColumnRenderer from './SettlementStatusColumnRenderer'
import QuantityColumnRenderer from './QuantityColumnRenderer'
import ShadowNAVColumnRenderer from './ShadowNAVColumnRenderer'
import NotificationsColumnRenderer from './NotificationsColumnRenderer'
import WAMColumnRenderer from './WAMColumnRenderer'
import TotalSharesColumnRenderer from './TotalSharesColumnRenderer'
import USDRefRateColumnRenderer from './USDRefRateColumnRenderer'
import SettlementPeriodColumnRenderer from './SettlementPeriodColumnRenderer'
import CutoffColumnRenderer, {
  RED_CUTOFF,
  SUB_CUTOFF,
} from './CutoffColumnRenderer'
import ExpenseRatioColumnRenderer from './ExpenseRatioColumnRenderer'
import NAVColumnRenderer from './NAVColumnRenderer'
import YieldColumnRenderer from './YieldColumnRenderer'
import TaxStatusColumnRenderer from './TaxStatusColumnRenderer'
import BalanceCCYEColumnRenderer from './BalanceCCYEColumnRenderer'
import DailyFactorColumnRenderer from './DailyFactorColumnRenderer'

export const RowSelectionColumn = {
  colId: 'row-select',
  id: 'row-select',
  xtype: 'checkcolumn',
  hideable: false,
  width: 45,
  lockPosition: true,
  lockPinned: true,
  lockVisible: true,
  suppressMovable: true,
  pinned: 'left',
  checkboxSelection: true,
  headerCheckboxSelection: true,
  disableCustomizeColumn: true,
  suppressToolPanel: true,
}

export const NotificationsColumn = {
  colId: 'alerts',
  dataIndex: 'fund.fundId',
  text: 'Alerts',
  hideable: false,
  showInMenu: false,
  // locked: true,
  renderer: NotificationsColumnRenderer,
  width: 70,
  lockPosition: true,
  lockPinned: true,
  lockVisible: true,
  suppressMovable: true,
  pinned: 'left',
  disableCustomizeColumn: true,
  suppressToolPanel: true,
}

export const FundIDColumn = {
  dataIndex: 'fund.fundId',
  text: 'Fund ID',
  width: 100,
}

export const FundProviderColumn = {
  // id: 'fund.provider.name',
  dataIndex: 'fund.provider.name',
  text: 'Fund Provider',
  // hidden: true,
  rowGroup: true,
  width: 250,
  hide: true,
  // sort: 'desc',
  // lockVisible: true,
}

export const FundNameColumn = {
  dataIndex: 'fund.name',
  text: 'Fund Name',
  // locked: true,
  hideable: false,
  width: 250,
  sort: 'asc',
  pinned: 'left',
  renderer: FundNameColumnRenderer,
}

export const FundLongNameColumn = {
  dataIndex: 'fund.longName',
  text: 'Fund Long Name',
  width: 250,
  renderer: FundNameColumnRenderer,
  hidden: true,
}

export const FundCategoryColumn = {
  dataIndex: 'fund.fundCategory.name',
  text: 'Fund Category',
  width: 180,
}

export const FundSubCategoryColumn = {
  dataIndex: 'fund.fundSubCategory.name',
  text: 'Fund Sub Category',
  width: 180,
  hidden: true,
}

export const CurrencyColumn = {
  // id: 'fund.currency.currencyCode',
  dataIndex: 'fund.currency.currencyCode',
  text: 'Currency',
  width: 105,
}

export const DomicileCountryColumn = {
  dataIndex: 'fund.domicileCountry.name',
  text: 'Domicile Country',
  width: 160,
  hidden: true,
}

export const SettlementPeriodColumn = {
  dataIndex: 'fund.settlementPeriod',
  text: 'Settlement Period',
  renderer: SettlementPeriodColumnRenderer,
  hidden: true,
  width: 205,
}

export const TradingWindowsColumn = {
  dataIndex: 'tradeWindows',
  text: 'Trading Windows',
  renderer: TradingWindowsColumnRenderer,
  textAlign: 'right',
  width: 160,
}

export const TaxStatusColumn = {
  dataIndex: 'fund.taxable',
  text: 'Tax Status',
  renderer: TaxStatusColumnRenderer,
  width: 115,
  hidden: true,
}

export const SubCutoffColumn = {
  dataIndex: 'fund.subCutoffTime',
  text: 'Sub Cutoff',
  renderer: CutoffColumnRenderer({ type: SUB_CUTOFF }),
  width: 115,
  textAlign: 'right',
}
export const RedCutoffColumn = {
  dataIndex: 'fund.redCutoffTime',
  text: 'Red Cutoff',
  renderer: CutoffColumnRenderer({ type: RED_CUTOFF }),
  width: 115,
  textAlign: 'right',
}

export const ContactNameColumn = {
  dataIndex: 'fund.contactName',
  text: 'Contact Name',
  width: 150,
  hidden: true,
}

export const ContactPhoneColumn = {
  dataIndex: 'fund.contactPhone',
  text: 'Contact Phone',
  width: 150,
  hidden: true,
}

export const CUSIPColumn = {
  dataIndex: 'fund.cusip',
  text: 'CUSIP',
  width: 130,
  hidden: true,
}

export const ISINColumn = {
  dataIndex: 'fund.isin',
  text: 'ISIN',
  width: 130,
  hidden: true,
}

export const FundNumberColumn = {
  dataIndex: 'fund.iso',
  text: 'Fund Number',
  width: 130,
  hidden: true,
}

export const SEDOLColumn = {
  dataIndex: 'fund.sedol',
  text: 'SEDOL',
  width: 130,
  hidden: true,
}

export const TickerColumn = {
  dataIndex: 'fund.ticker',
  text: 'Ticker',
  width: 130,
  hidden: true,
}

export const OtherIdentifierColumn = {
  dataIndex: 'fund.otherFundCode',
  text: 'Other Identifier',
  width: 130,
  hidden: true,
}

export const FitchRatingColumn = {
  dataIndex: 'fund.statistics.fitchRating',
  text: 'Fitch Rating',
  width: 135,
  hidden: true,
  renderer: UpdateDateColumnRenderer({
    dateKey: 'fund.statistics.dtUpdFitchRating',
  }),
}

export const MoodyRatingColumn = {
  dataIndex: 'fund.statistics.moodyRating',
  text: 'Moody Rating',
  width: 135,
  hidden: true,
  renderer: UpdateDateColumnRenderer({
    dateKey: 'fund.statistics.dtUpdMoodyRating',
  }),
}

export const NAICRatingColumn = {
  dataIndex: 'fund.statistics.naicRating',
  text: 'NAIC Rating',
  width: 135,
  hidden: true,
  renderer: UpdateDateColumnRenderer({
    dateKey: 'fund.statistics.dtUpdNaicRating',
  }),
}

export const SPRatingColumn = {
  dataIndex: 'fund.statistics.spRating',
  text: 'S&P Rating',
  width: 135,
  renderer: UpdateDateColumnRenderer({
    dateKey: 'fund.statistics.dtUpdSpRating',
  }),
}

export const AUMColumn = {
  dataIndex: 'fund.statistics.aum',
  text: 'Assets (Millions)',
  width: 160,
  renderer: AUMColumnRenderer,
  textAlign: 'right',
}

export const DlyFactorColumn = {
  dataIndex: 'fund.statistics.dailyFactor',
  text: 'Dly Factor',
  width: 120,
  renderer: DailyFactorColumnRenderer,
  textAlign: 'right',
}

export const NAVColumn = {
  dataIndex: 'fund.statistics.nav',
  text: 'NAV',
  width: 120,
  renderer: NAVColumnRenderer,
  textAlign: 'right',
}

export const ShadowNAVColumn = {
  dataIndex: 'fund.statistics.shadowNav',
  width: 120,
  hidden: true,
  text: 'Shadow NAV',
  renderer: ShadowNAVColumnRenderer,
  textAlign: 'right',
}

export const NetFlowsColumn = {
  dataIndex: 'fund.statistics.netFlows',
  text: 'Net Flows (Millions)',
  width: 160,
  hidden: true,
  renderer: AUMColumnRenderer,
  textAlign: 'right',
}

export const WAMColumn = {
  dataIndex: 'fund.statistics.wam',
  text: 'WAM',
  width: 85,
  renderer: WAMColumnRenderer,
  textAlign: 'right',
}

export const OneDayYieldColumn = {
  dataIndex: 'fund.statistics.yld1Day',
  text: '1D Yield',
  width: 110,
  renderer: YieldColumnRenderer,
  textAlign: 'right',
}

export const SevenDayYieldColumn = {
  dataIndex: 'fund.statistics.yld7Day',
  text: '7D Yield',
  width: 110,
  renderer: YieldColumnRenderer,
  textAlign: 'right',
}

export const ThirtyDayYieldColumn = {
  dataIndex: 'fund.statistics.yld30Day',
  text: '30D Yield',
  width: 110,
  renderer: YieldColumnRenderer,
  textAlign: 'right',
}

export const OneDayLiquidityColumn = {
  dataIndex: 'fund.statistics.liquidity1Day',
  text: '1D Liquidity',
  width: 125,
  hidden: true,
  renderer: LiquidityColumnRenderer,
  textAlign: 'right',
}

export const SevenDayLiquidityColumn = {
  dataIndex: 'fund.statistics.liquidity7Day',
  text: '7D Liquidity',
  width: 125,
  hidden: true,
  renderer: LiquidityColumnRenderer,
  textAlign: 'right',
}

export const ExpenseRatioColumn = {
  dataIndex: 'fund.expenseRatio',
  text: 'Expense Ratio',
  width: 125,
  // hidden: true,
  renderer: ExpenseRatioColumnRenderer,
  textAlign: 'right',
}

export const PercentageOwnedColumn = {
  dataIndex: 'balance.percentageOwned',
  text: '% Owned',
  renderer: PercentageOwnedColumnRenderer,
  textAlign: 'right',
}

export const MarketValueColumn = {
  dataIndex: 'balance.balanceAmt',
  text: 'Market Value',
  renderer: BalanceColumnRenderer,
  aggFunc: 'sum',
  textAlign: 'right',
}

export const MarketValueUSDEColumn = {
  dataIndex: 'balance.balanceAmtUSDE',
  text: 'Market Value USDE',
  renderer: BalanceCCYEColumnRenderer,
  aggFunc: 'sum',
  textAlign: 'right',
}

export const EstimatedMarketValueColumn = {
  dataIndex: 'balance.estimatedMarketValue',
  text: 'Estimated Market Value',
  renderer: BalanceColumnRenderer,
  aggFunc: 'sum',
  textAlign: 'right',
}

export const EstimatedMarketValueUSDEColumn = {
  dataIndex: 'balance.estimatedMarketValueUSDE',
  text: 'Estimated Market Value USDE',
  renderer: BalanceCCYEColumnRenderer,
  aggFunc: 'sum',
  textAlign: 'right',
}

export const TotalSharesColumn = {
  dataIndex: 'balance.shares',
  text: 'Total Shares',
  renderer: TotalSharesColumnRenderer,
  aggFunc: 'sum',
  textAlign: 'right',
}

export const AccrualColumn = {
  dataIndex: 'balance.accruedAmt',
  text: 'Accrual',
  renderer: BalanceColumnRenderer,
  aggFunc: 'sum',
  textAlign: 'right',
}
export const TotalValueColumn = {
  dataIndex: 'balance.value',
  text: 'Total Value',
  renderer: BalanceColumnRenderer,
  aggFunc: 'sum',
  textAlign: 'right',
}

export const USDRefRateColumn = {
  dataIndex: 'balance.fxRateDTO.usdMid',
  text: 'USD Ref Rate',
  renderer: USDRefRateColumnRenderer,
  textAlign: 'right',
}

export const OrderStatusColumn = {
  dataIndex: 'order.orderStatus',
  text: 'Status',
  renderer: OrderStatusColumnRenderer,
  width: 100,
}

export const ProviderAccountColumn = {
  dataIndex: 'order.providerAccount',
  text: 'Provider Account',
  width: 140,
  hidden: true,
}

export const InvestorGroupColumn = {
  dataIndex: 'order.investorGroup',
  text: 'Investor Group',
  width: 130,
  hidden: true,
}

export const CashSSINameColumn = {
  dataIndex: 'order.cashInstruction.displayName',
  text: 'Cash SSI Name',
  width: 150,
  hidden: true,
}

export const CashSSICustodianNameColumn = {
  dataIndex: 'order.cashInstruction.custodianName',
  text: 'Cash SSI Custodian Name',
  width: 200,
  hidden: true,
}

export const CashSSICustodianAccountColumn = {
  dataIndex: 'order.cashInstruction.custodianAccount',
  text: 'Cash SSI Custodian Account',
  width: 230,
  hidden: true,
}

export const CashSSICustodianBICColumn = {
  dataIndex: 'order.cashInstruction.custodianBIC',
  text: 'Cash SSI Custodian BIC',
  width: 200,
  hidden: true,
}

export const CustodySSINameColumn = {
  dataIndex: 'order.custodyInstruction.displayName',
  text: 'Custody SSI Name',
  width: 150,
  hidden: true,
}

export const CustodySSICustodianNameColumn = {
  dataIndex: 'order.custodyInstruction.custodianName',
  text: 'Custody SSI Custodian Name',
  width: 210,
  hidden: true,
}

export const CustodySSICustodianAccountColumn = {
  dataIndex: 'order.custodyInstruction.custodianAccount',
  text: 'Custody SSI Custodian Account',
  width: 230,
  hidden: true,
}

export const CustodySSICustodianBICColumn = {
  dataIndex: 'order.custodyInstruction.custodianBIC',
  text: 'Custody SSI Custodian BIC',
  width: 200,
  hidden: true,
}

export const CashSSICutoffTimeColumn = {
  dataIndex: 'order.cashInstruction.cashCutoffTimeDisplay',
  text: 'Cash SSI CutOff Time',
  width: 200,
  hidden: true,
}

export const OrderPriceColumn = {
  dataIndex: 'order.fundAccount.fund.statistics.latestPrice',
  text: 'Price',
  width: 100,
  // hidden: true,
}

export const OrderTotalSharesColumn = {
  dataIndex: 'order.totalShares',
  text: 'Total Shares',
  width: 130,
  // hidden: true,
}

export const OrderValueColumn = {
  dataIndex: 'order.settlementAmt',
  text: 'Order Value',
  width: 100,
  // hidden: true,
}

export const RedemptionFeeTypeColumn = {
  dataIndex: 'order.redemptionFeeType',
  text: 'Redemption Fee Type',
  width: 165,
  // hidden: true,
}

export const RedemptionFeeColumn = {
  dataIndex: 'order.redemptionFee',
  text: 'Redemption Fee',
  width: 140,
  // hidden: true,
}

export const OrderIdColumn = {
  dataIndex: 'order.orderId',
  text: 'Order ID',
  renderer: OrderIdColumnRenderer,
  width: 100,
}

export const SubmitDateColumn = {
  dataIndex: 'order.submitDate',
  text: 'Submit Date',
  renderer: DateColumnRenderer,
  width: 150,
}

export const TradeDateColumn = {
  dataIndex: 'order.tradeDate',
  text: 'Trade Date',
  renderer: DateColumnRenderer,
  width: 150,
}

export const InvestorAccountColumn = {
  dataIndex: 'order.fundAccount.account.name',
  text: 'Investor Account',
  width: 200,
}

export const InvestorColumn = {
  dataIndex: 'order.investorUid',
  text: 'Investor',
  width: 200,
}

export const TradeSideColumn = {
  dataIndex: 'order.side',
  text: 'Side',
  renderer: CapitalCaseColumnRenderer,
  width: 100,
}

// TODO: Use qtyFormat to format the number correctly
// TODO: Figure out why qty format doesn't do anything
export const QuantityColumn = {
  dataIndex: 'order.quantity',
  text: 'Quantity',
  renderer: QuantityColumnRenderer,
  width: 100,
}

export const OrderCurrencyColumn = {
  dataIndex: 'order.currency.currencyCode',
  text: 'Currency',
  width: 100,
}

export const QuantityTypeColumn = {
  dataIndex: 'order.qtyType',
  text: 'Qty Type',
  renderer: CapitalCaseColumnRenderer,
  width: 100,
}

export const SettlementDateColumn = {
  dataIndex: 'order.settlementDate',
  text: 'Settlement Date',
  renderer: DateColumnRenderer,
  width: 200,
}

export const CashSettlementStatusColumn = {
  dataIndex: 'order.cashSettlementStatus',
  text: 'Cash Settlement Status',
  renderer: SettlementStatusColumnRenderer,
  width: 200,
}

export const CustodySettlementStatusColumn = {
  dataIndex: 'order.custodySettlementStatus',
  text: 'Custody Settlement Status',
  renderer: SettlementStatusColumnRenderer,
  width: 200,
}

export const BloombergIDColumn = {
  dataIndex: 'id',
  text: 'Bloomberg ID',
  width: 200,
}

export const OrderIDColumn = {
  dataIndex: 'orderID',
  text: 'Order ID',
}

export const StatusColumn = {
  dataIndex: 'status',
  text: 'Status',
}

export const BondSettlementDateColumn = {
  dataIndex: 'bondSettlementDate',
  text: 'Bond Settlement Date',
}

export const FundCodeColumn = {
  dataIndex: 'fundCode',
  text: 'Fund Code',
}

export const SideColumn = {
  dataIndex: 'side',
  text: 'Side',
}

export const QtyTypeColumn = {
  dataIndex: 'QtyTypeColumn',
  text: 'Qty Type',
}

export const OrderTypeColumn = {
  dataIndex: 'orderType',
  text: 'Order Type',
}
