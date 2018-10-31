import { GraphQLString } from 'graphql'

import { createType } from '../schemaHelpers'

const BenchmarkType = {
  name: 'Benchmark',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
}

export default createType(BenchmarkType)
