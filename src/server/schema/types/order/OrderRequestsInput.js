import { GraphQLList, GraphQLString, GraphQLInputObjectType } from 'graphql'
import OrderRequestInput from './OrderRequestInput'

const OrderRequestsInput = {
  name: 'OrderRequestsInput',
  fields: {
    clientMutationId: {
      type: GraphQLString,
    },
    orderRequests: {
      type: GraphQLList(OrderRequestInput),
    },
  },
}

export default new GraphQLInputObjectType(OrderRequestsInput)
