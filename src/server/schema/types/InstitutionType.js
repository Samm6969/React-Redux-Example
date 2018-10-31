import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const InstitutionType = {
  name: 'Institution',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(InstitutionType)
