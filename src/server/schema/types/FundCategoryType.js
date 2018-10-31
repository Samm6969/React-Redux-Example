import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const FundCategoryType = {
  name: 'FundCategory',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(FundCategoryType)
