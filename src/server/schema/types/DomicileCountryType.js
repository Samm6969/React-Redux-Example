import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const DomicileCountryType = {
  name: 'DomicileCountry',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(DomicileCountryType)
