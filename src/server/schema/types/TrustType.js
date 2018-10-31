import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const TrustType = {
  name: 'Trust',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(TrustType)
