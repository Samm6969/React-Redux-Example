import * as Columns from '../../columns'

export default [
  Columns.NotificationsColumn,
  {
    text: 'Details',
    children: [
      Columns.FundProviderColumn,
      Columns.FundNameColumn,
      Columns.FundLongNameColumn,
      Columns.FundCategoryColumn,
      Columns.FundSubCategoryColumn,
      Columns.CurrencyColumn,
      Columns.DomicileCountryColumn,
      Columns.SettlementPeriodColumn,
      Columns.TaxStatusColumn,
      Columns.SubCutoffColumn,
      Columns.RedCutoffColumn,
      Columns.ContactNameColumn,
      Columns.ContactPhoneColumn,
    ],
  },
  {
    text: 'Identifiers',
    children: [
      Columns.CUSIPColumn,
      Columns.ISINColumn,
      Columns.FundNumberColumn,
      Columns.SEDOLColumn,
      Columns.TickerColumn,
      Columns.OtherIdentifierColumn,
    ],
  },
  {
    text: 'Ratings',
    children: [
      Columns.FitchRatingColumn,
      Columns.MoodyRatingColumn,
      Columns.NAICRatingColumn,
      Columns.SPRatingColumn,
    ],
  },
  {
    text: 'Statistics',
    children: [
      Columns.AUMColumn,
      Columns.DlyFactorColumn,
      Columns.NAVColumn,
      Columns.ShadowNAVColumn,
      Columns.NetFlowsColumn,
      Columns.WAMColumn,
      Columns.OneDayYieldColumn,
      Columns.SevenDayYieldColumn,
      Columns.ThirtyDayYieldColumn,
      Columns.OneDayLiquidityColumn,
      Columns.SevenDayLiquidityColumn,
      Columns.ExpenseRatioColumn,
    ],
  },
]
