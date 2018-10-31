import { GraphQLList, GraphQLString, GraphQLInputObjectType } from 'graphql'
import AftOrderRequestInput from './AftOrderRequestInput'

const AftOrderRequestsInput = {
  name: 'AftOrderRequestsInput',
  fields: {
    clientMutationId: {
      type: GraphQLString,
    },
    aftOrderRequests: {
      type: GraphQLList(AftOrderRequestInput),
    },
  },
}

export default new GraphQLInputObjectType(AftOrderRequestsInput)
