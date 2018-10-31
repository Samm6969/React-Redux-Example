import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const FundSubCategoryType = {
  name: 'FundSubCategory',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(FundSubCategoryType)
