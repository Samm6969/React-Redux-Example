import { GraphQLString, GraphQLList } from 'graphql'
import OrderResponseType from './OrderResponseType'
import { createType } from '../../schemaHelpers'

const OrderResponsesType = {
  name: 'OrderResponses',
  fields: {
    tradeValidationSummaryMessages: {
      type: GraphQLList(GraphQLString),
    },
    orderResponses: {
      type: GraphQLList(OrderResponseType),
    },
  },
}

export default createType(OrderResponsesType)
