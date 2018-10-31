import { GraphQLString, GraphQLInt } from 'graphql'

import { createType } from '../schemaHelpers'

const TradeWindowsType = {
  name: 'TradeWindows',
  fields: {
    addedBy: { type: GraphQLString },
    cobrandId: { type: GraphQLInt },
    endTime: {
      type: GraphQLString,
      description: 'Base End Time aka Strike Time. No offset applied',
    },
    expectedPriceTime: { type: GraphQLString },
    fundId: { type: GraphQLInt },
    fundTimezoneId: { type: GraphQLInt },
    fundTimezoneName: { type: GraphQLString },
    invAccountId: { type: GraphQLInt },
    providerTradeWindowRef: { type: GraphQLString },
    redEndTime: {
      type: GraphQLString,
      description:
        'Red Cutoff Time. Account and CoBrand offset already applied.',
    },
    redemptionSettlementPeriod: {
      type: GraphQLInt,
      description: 'Red Settlement Period with trade window',
    },
    startTime: {
      type: GraphQLString,
      description: 'Window Open Time',
    },
    subEndTime: {
      type: GraphQLString,
      description:
        'Sub Cutoff Time. Account and CoBrand Offset already applied.',
    },
    subscriptionSettlementPeriod: {
      type: GraphQLInt,
      description: 'Sub Settlement Period with trade window',
    },
    tradeWindowsId: {
      type: GraphQLInt,
      resolve(parent) {
        return parent.tradeWindowId
      },
    },
  },
}

export default createType(TradeWindowsType)
