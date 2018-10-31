import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const TimeZoneType = {
  name: 'TimeZone',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(TimeZoneType)
