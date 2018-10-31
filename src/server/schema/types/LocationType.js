import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const LocationType = {
  name: 'Location',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(LocationType)
