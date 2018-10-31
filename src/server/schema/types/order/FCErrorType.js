import { GraphQLString } from 'graphql'
import { createType } from '../../schemaHelpers'

const FCErrorType = {
  name: 'FCErrorType',
  idFetcher: ({ errorCode }) => errorCode,
  fields: {
    errorCode: {
      type: GraphQLString,
    },
    errorText: {
      type: GraphQLString,
    },
  },
}

export default createType(FCErrorType)
