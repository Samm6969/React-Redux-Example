import { GraphQLString, GraphQLBoolean } from 'graphql'
import { createType } from '../schemaHelpers'

const PaymentInstructionType = {
  name: 'PaymentInstructions',
  fields: {
    name: {
      type: GraphQLString,
    },
    displayName: {
      type: GraphQLString,
    },
    additionalInfo: {
      type: GraphQLString,
    },
    beneficiaryAccountNumber: {
      type: GraphQLString,
    },
    beneficiaryBankNameAddress: {
      type: GraphQLString,
    },
    beneficiaryNameAddress: {
      type: GraphQLString,
    },
    defaultCurrencyPaymentInstruction: {
      type: GraphQLBoolean,
    },
    intermediaryBankNameAddress: {
      type: GraphQLString,
    },
  },
}

export default createType(PaymentInstructionType)
