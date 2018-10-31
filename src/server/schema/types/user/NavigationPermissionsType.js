import { GraphQLBoolean } from 'graphql'

import { createType } from '../../schemaHelpers'

const NavigationPermissionsType = {
  name: 'NavigationPermissions',
  fields: {
    dashboard: {
      type: GraphQLBoolean,
    },
    portfolio: {
      type: GraphQLBoolean,
    },
    searchFunds: {
      type: GraphQLBoolean,
    },
    tradeShortTerm: {
      type: GraphQLBoolean,
      resolve: parent => parent.accessShortTerm,
    },
    tradeLongTerm: {
      type: GraphQLBoolean,
      resolve: parent => parent.accessLongTerm,
    },
    tradeNonDirect: {
      type: GraphQLBoolean,
      resolve: parent => parent.accessNonDirect,
    },
    tradeETF: {
      type: GraphQLBoolean,
      resolve: parent => parent.accessETF,
    },
    tradeETFBloombergBasket: {
      type: GraphQLBoolean,
      resolve: parent => parent.accessETFBloombergBasket,
    },
    tradeAFT: {
      type: GraphQLBoolean,
      resolve: parent => parent.accessAFT,
    },
    tradeBlotter: {
      type: GraphQLBoolean,
      resolve: parent => parent.accessTradeBlotter,
    },
    tradeActivityReport: {
      type: GraphQLBoolean,
    },
    fundStatisticsReport: {
      type: GraphQLBoolean,
    },
    intradayPricesReport: {
      type: GraphQLBoolean,
    },
    holdingsReport: {
      type: GraphQLBoolean,
    },
    accountSummaryReport: {
      type: GraphQLBoolean,
    },
    transparencyConnect: {
      type: GraphQLBoolean,
    },
    manager: {
      type: GraphQLBoolean,
    },
    settlementInstructions: {
      type: GraphQLBoolean,
    },
    emailNotifications: {
      type: GraphQLBoolean,
    },
    capitalAdvisorsRatings: {
      type: GraphQLBoolean,
    },
    preferences: {
      type: GraphQLBoolean,
    },
  },
}

export default createType(NavigationPermissionsType)
