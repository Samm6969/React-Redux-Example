import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const DivisionType = {
  name: 'Division',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(DivisionType)
