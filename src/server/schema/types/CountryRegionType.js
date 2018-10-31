import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const CountryRegionType = {
  name: 'CountryRegion',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(CountryRegionType)
