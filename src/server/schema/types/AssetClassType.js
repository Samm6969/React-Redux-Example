import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const AssetClassType = {
  name: 'AssetClass',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(AssetClassType)
