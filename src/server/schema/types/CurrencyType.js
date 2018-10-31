import { GraphQLString, GraphQLInt } from 'graphql'

import { createType } from '../schemaHelpers'

const CurrencyType = {
  name: 'Currency',
  fields: {
    name: { type: GraphQLString },
    currencyCode: { type: GraphQLString },
    precision: { type: GraphQLInt },
    status: { type: GraphQLString },
  },
}

export default createType(CurrencyType)
