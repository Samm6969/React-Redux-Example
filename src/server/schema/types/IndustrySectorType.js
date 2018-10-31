import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const IndustrySectorType = {
  name: 'IndustrySector',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(IndustrySectorType)
