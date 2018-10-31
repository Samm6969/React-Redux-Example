import React from 'react'
import { Legal, ScrollContainer, Support } from '@fc/react-playbook'
import { ACCOUNT_TYPES, FUND_TYPES } from '../enums'

import OrderEntryRoute from './OrderEntryRoute'
import DashboardRoute from './DashboardRoute'
import FundDetailsRoute from './FundDetailsRoute'
import InvestmentOptionsRoute from './InvestmentOptionsRoute'
import SearchFundsRoute from './SearchFundsRoute'
import BloombergBSKTRoute from './BloombergBSKTRoute'
import TradeBlotterRoute from './TradeBlotterRoute'
import TradeActivityRoute from './TradeActivityRoute'
import TransparencyDetail from './TransparencyDetailRoute'

import AgentFundTradingRoute from './AgentFundTradingRoute'
import PortfolioRoute from './PortfolioRoute'
import InvestmentOptionsSandbox from '../containers/InvestmentOptionsSandbox'
// import ExtJSGridRoute from './ExtJSGridRoute'

const SearchFunds = SearchFundsRoute({
  title: 'Search Short Term Funds',
  fundType: FUND_TYPES.SHORT_TERM,
  accountType: ACCOUNT_TYPES.FULLY_DISCLOSED,
})

const ShortTermFunds = InvestmentOptionsRoute({
  title: 'Short Term Funds',
  fundType: FUND_TYPES.SHORT_TERM,
  accountType: ACCOUNT_TYPES.FULLY_DISCLOSED,
})

const LongTermFunds = InvestmentOptionsRoute({
  title: 'Long Term Funds',
  fundType: FUND_TYPES.LONG_TERM,
  accountType: ACCOUNT_TYPES.FULLY_DISCLOSED,
})

const NonDirect = InvestmentOptionsRoute({
  title: 'Non-Direct',
  fundType: FUND_TYPES.SHORT_TERM,
  accountType: ACCOUNT_TYPES.OMNI,
})

const AgentFundTrading = AgentFundTradingRoute({
  title: 'Order Entry',
})

const TradeActivity = TradeActivityRoute({ title: 'Trade Activity' })

const orderEntry = [
  {
    path: '/order-entry',
    title: 'Order Entry',
    component: OrderEntryRoute,
  },
]

const portfolio = PortfolioRoute({ title: 'Portfolio Chart' })

export default [
  {
    path: '/',
    title: 'Dashboard',
    component: DashboardRoute,
    permission: 'dashboard',
  },
  {
    path: '/funds/search',
    title: 'Search Funds',
    component: SearchFunds,
    permission: 'searchFunds',
  },
  {
    path: '/trade/direct/short-term-ag-grid',
    title: 'Investment Options ag-Grid',
    component: props => (
      <InvestmentOptionsSandbox
        title="Short Term Funds - ag-Grid"
        fundType={FUND_TYPES.SHORT_TERM}
        accountType={ACCOUNT_TYPES.FULLY_DISCLOSED}
        {...props}
      />
    ),
    routes: [...orderEntry],
    permission: 'tradeShortTerm',
  },
  {
    path: '/trade/direct/short-term',
    title: 'Investment Options',
    component: ShortTermFunds,
    routes: [...orderEntry],
    permission: 'tradeShortTerm',
  },
  {
    path: '/trade/direct/long-term',
    title: 'Investment Options',
    component: LongTermFunds,
    routes: [...orderEntry],
    permission: 'tradeLongTerm',
  },
  {
    path: '/trade/non-direct/short-term',
    title: 'Investment Options',
    component: NonDirect,
    routes: [...orderEntry],
    permission: 'tradeNonDirect',
  },
  {
    path: '/trade/agent-fund-trading',
    title: 'Agent Fund Trading | Order Entry',
    component: AgentFundTrading,
    permission: 'tradeAFT',
  },
  {
    path: '/trade/blotter',
    title: 'Trade Blotter',
    component: TradeBlotterRoute,
    permission: 'tradeBlotter',
  },
  {
    path: '/trade/bloomberg-bskt',
    title: 'Bloomberg BSKT',
    component: BloombergBSKTRoute,
    permission: 'tradeETFBloombergBasket',
  },
  {
    path: '/fund-details/:id',
    title: 'Fund Details',
    component: FundDetailsRoute,
    routes: [...orderEntry],
  },
  {
    path: '/reports/trade-activity',
    title: 'Trade Activity',
    component: TradeActivity,
    permission: 'tradeActivityReport',
  },
  // {
  //   path: '/extjs',
  //   title: 'Ext JS Grid Example',
  //   component: ExtJSGridRoute,
  // },
  {
    path: '/portfolio',
    title: 'Portfolio',
    component: portfolio,
    permission: 'portfolio',
  },
  {
    path: '/transparency/detail',
    title: 'Transparency Detail',
    component: TransparencyDetail,
    permission: 'transparencyConnect',
  },
  {
    path: '/legal',
    title: 'Legal',
    component: () => (
      <ScrollContainer>
        <Legal />
      </ScrollContainer>
    ),
  },
  {
    path: '/support',
    title: 'Support',
    component: () => (
      <ScrollContainer>
        <Support />
      </ScrollContainer>
    ),
  },
]
