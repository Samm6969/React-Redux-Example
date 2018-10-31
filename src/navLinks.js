export default [
  {
    exact: true,
    to: '/',
    label: 'Dashboard',
    permission: 'dashboard',
  },
  {
    to: '/portfolio',
    label: 'Portfolio',
    permission: 'portfolio',
  },
  {
    to: '/funds/search',
    label: 'Search Funds',
    permission: 'searchFunds',
  },
  {
    group: 'Trade',
    to: '/trade',
    collapsible: true,
    items: [
      {
        to: '/direct/short-term',
        label: 'Short Term Funds',
        permission: 'tradeShortTerm',
      },
      {
        to: '/direct/short-term-ag-grid',
        label: 'Short Term Funds ag-Grid',
        permission: 'tradeShortTerm',
      },
      {
        to: '/direct/long-term',
        label: 'Long Term Funds',
        permission: 'tradeLongTerm',
      },
      {
        to: '/non-direct/short-term',
        label: 'Non-Direct',
        permission: 'tradeNonDirect',
      },
      {
        to: '/etf',
        label: 'ETFs',
        permission: 'tradeETF',
      },
      {
        to: '/bloomberg-bskt',
        label: 'Bloomberg BSKT',
        permission: 'tradeETFBloombergBasket',
      },
      {
        to: '/agent-fund-trading',
        label: 'Agent Fund Trading',
        permission: 'tradeAFT',
      },
      {
        to: '/blotter',
        label: 'Trade Blotter',
        permission: 'tradeBlotter',
      },
    ],
  },
  {
    group: 'Reports',
    to: '/reports',
    collapsible: true,
    items: [
      {
        to: '/trade-activity',
        label: 'Trade Activity',
        permission: 'tradeActivityReport',
      },
      {
        to: '/fund-statistics',
        label: 'Fund Statistics',
        permission: 'fundStatisticsReport',
      },
      {
        to: '/intraday-prices',
        label: 'Intraday Prices',
        permission: 'intradayPricesReport',
      },
      {
        to: '/holdings-report',
        label: 'Holdings Report',
        permission: 'holdingsReport',
      },
      {
        to: '/account-summary',
        label: 'Account Summary',
        permission: 'accountSummaryReport',
      },
    ],
  },
  {
    group: 'Transparency',
    to: '/transparency',
    collapsible: true,
    permission: 'transparencyConnect',
    items: [
      {
        to: '/detail',
        label: 'Details',
      },
      {
        to: '/chart',
        label: 'Chart',
      },
      {
        to: '/virtual-portfolio',
        label: 'Virtual Portfolio',
      },
    ],
  },
  {
    group: 'Administration',
    to: '/admin',
    collapsible: true,
    items: [
      {
        to: '/manager',
        label: 'Manager',
        permission: 'manager',
        items: [
          {
            to: '/order-limits',
            label: 'Investor Order Limits',
          },
          {
            to: '/fund-limits',
            label: 'Fund Limits',
          },
          {
            to: '/order-notifications',
            label: 'Order Notifications',
          },
        ],
      },
      {
        to: '/settlement-instructions',
        label: 'Settlement Instructions',
        permission: 'settlementInstructions',
      },
      {
        to: '/email-notifications',
        label: 'Email Notifications',
        permission: 'emailNotifications',
      },
      {
        to: '/preferences',
        label: 'Preferences',
        permission: 'preferences',
      },
    ],
  },
]
