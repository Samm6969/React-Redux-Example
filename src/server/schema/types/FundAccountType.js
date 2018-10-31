import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql'
// import _ from 'lodash'

// import { fromGlobalId } from 'graphql-relay'

import { createType } from '../schemaHelpers'
import CashInstructionType from './CashInstructionType'
import FundType from './FundType'
import AccountType from './AccountType'
import TradeWindowsType from './TradeWindowsType'
import QtyTypes from './QtyTypes'
import CustodyInstructionType from './CustodyInstructionType'
import PaymentInstructionType from './PaymentInstructionType'

const FundAccountType = {
  name: 'FundAccount',
  fields: {
    account: {
      type: AccountType,
      resolve(root, args, context) {
        const { account } = root
        const { getAccounts } = context
        return getAccounts.load(account.id)
      },
    },
    fund: {
      type: FundType,
      resolve(root, args, context) {
        const { getFunds } = context
        return getFunds.load(root.fund.id)
      },
    },
    providerAccountNumber: { type: GraphQLString },
    balance: {
      type: new GraphQLObjectType({
        name: 'Balance',
        fields: {
          accruedAmt: { type: GraphQLFloat },
          balanceAmt: { type: GraphQLFloat },
          balanceAmtUSDE: { type: GraphQLFloat },
          balanceDt: { type: GraphQLString },
          currencyCode: { type: GraphQLString },
          estimatedMarketValue: { type: GraphQLFloat },
          estimatedMarketValueUSDE: { type: GraphQLFloat },
          estimatedOrderAmt: { type: GraphQLFloat },
          expectedUpdateDate: { type: GraphQLString },
          fxRateDTO: {
            type: new GraphQLObjectType({
              name: 'FxRate',
              fields: {
                currencyCode: { type: GraphQLString },
                effectiveDate: { type: GraphQLString },
                expectedUpdateDate: { type: GraphQLString },
                id: { type: GraphQLFloat },
                mr: { type: GraphQLString },
                rateType: { type: GraphQLString },
                stale: { type: GraphQLBoolean },
                usdMid: { type: GraphQLFloat },
              },
            }),
          },
          percentageOwned: { type: GraphQLFloat },
          shares: { type: GraphQLFloat },
          stale: { type: GraphQLBoolean },
          value: { type: GraphQLFloat },
        },
        resolve(parent) {
          return parent.balance
        },
      }),
    },
    tradeWindows: {
      type: GraphQLList(TradeWindowsType),
      resolve(root, args, context) {
        const { id, fund } = root
        if (fund.supportTradeWindows) {
          const { getTradeWindows } = context
          return getTradeWindows.load(id)
        }
        return null
      },
    },
    cashInstructions: {
      type: GraphQLList(CashInstructionType),
      resolve(root, args, context) {
        const { id } = root
        return context.getCashSettlementInstructions.load(id)
      },
    },
    custodyInstructions: {
      type: GraphQLList(CustodyInstructionType),
      resolve(root, args, context) {
        const { id } = root
        return context.getCustodySettlementInstructions.load(id)
      },
    },
    paymentInstructions: {
      type: GraphQLList(PaymentInstructionType),
      resolve(root, args, context) {
        const { id } = root
        return context.getPaymentInstructions.load(id)
      },
    },
    supportedQtyTypes: {
      type: QtyTypes,
      resolve(root, args, context) {
        const { fundId, invAccountId } = root.fundAccountId
        return Promise.all([
          context.getFundQtyTypeSides.load(fundId),
          context.getAccounts.load(invAccountId),
        ]).then(values => {
          const [supportedQtyTypesByTradingType, invAccount] = values
          return invAccount.accountType === 'OMNI'
            ? supportedQtyTypesByTradingType.fundQtyTypeSidesForNonDirect
            : supportedQtyTypesByTradingType.fundQtyTypeSidesForDirect
        })
      },
    },
  },
}

export default createType(FundAccountType)
