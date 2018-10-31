import { GraphQLString, GraphQLBoolean } from 'graphql'
import { createType } from '../schemaHelpers'

const CustodyInstructionType = {
  name: 'CustodyInstruction',
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
    includeCashParties: {
      type: GraphQLBoolean,
    },
    custodyBuyMsgType: {
      type: GraphQLString,
    },
    custodySellMsgType: {
      type: GraphQLString,
    },
  },
}

export default createType(CustodyInstructionType)
