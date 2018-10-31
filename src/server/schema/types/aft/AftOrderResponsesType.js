import { GraphQLList } from 'graphql'
import AftOrderResponseType from './AftOrderResponseType'
import { createType } from '../../schemaHelpers'

const AftOrderResponsesType = {
  name: 'AftOrderResponses',
  fields: {
    orderResponses: {
      type: GraphQLList(AftOrderResponseType),
    },
  },
}

export default createType(AftOrderResponsesType)
