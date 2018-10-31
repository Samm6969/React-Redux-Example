import { GraphQLString, GraphQLList } from 'graphql'
import { createType } from '../schemaHelpers'

const QtyTypes = {
  name: 'QtyTypes',
  fields: {
    tradingType: {
      type: GraphQLString,
    },
    buy: {
      type: GraphQLList(GraphQLString),
      resolve(root) {
        return root.fundSupportedQtyTypesForBuy
      },
    },
    sell: {
      type: GraphQLList(GraphQLString),
      resolve(root) {
        return root.fundSupportedQtyTypesForSell
      },
    },
  },
}
export default createType(QtyTypes)
