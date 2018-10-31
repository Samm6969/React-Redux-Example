import { GraphQLString, GraphQLBoolean } from 'graphql'
import { createType } from '../schemaHelpers'

const CashInstructionType = {
  name: 'CashInstruction',
  fields: {
    name: {
      type: GraphQLString,
    },
    displayName: {
      type: GraphQLString,
    },
    defaultCurrencySSI: {
      type: GraphQLBoolean,
    },
    custodianName: {
      type: GraphQLString,
    },
    custodianAccount: {
      type: GraphQLString,
    },
    custodianBIC: {
      type: GraphQLString,
    },
    cashCutoffTimeDisplay: {
      type: GraphQLString,
    },
    cashBuyMsgType: {
      type: GraphQLString,
    },
    cashSellMsgType: {
      type: GraphQLString,
    },
  },
}

export default createType(CashInstructionType)
