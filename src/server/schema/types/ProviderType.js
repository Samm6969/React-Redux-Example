import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const ProviderType = {
  name: 'Provider',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(ProviderType)
