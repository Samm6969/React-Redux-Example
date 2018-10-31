import { GraphQLString, GraphQLInputObjectType } from 'graphql'

const AftOrderRequestInput = {
  name: 'AftOrderRequestInput',
  fields: {
    accountNumber: { type: GraphQLString },
    isin: { type: GraphQLString },
    side: { type: GraphQLString },
    quantityType: { type: GraphQLString },
    amount: { type: GraphQLString },
    currency: { type: GraphQLString },
    clientReferenceNumber: { type: GraphQLString },
  },
}
export default new GraphQLInputObjectType(AftOrderRequestInput)
