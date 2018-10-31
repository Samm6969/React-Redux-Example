import { GraphQLString } from 'graphql'
import { createType } from '../schemaHelpers'

const ClientType = {
  name: 'ClientType',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(ClientType)
