import { GraphQLObjectType, GraphQLString, GraphQLEnumType } from 'graphql'
import { globalIdField } from 'graphql-relay'
import _ from 'lodash'

import { GraphQLInterfaceType } from 'graphql/type/definition'
import { nodeInterface } from './node'

// eslint-disable-next-line import/prefer-default-export
export const createType = ({
  name,
  fields,
  idFetcher,
  interfaces,
  isTypeOf,
}) => {
  const globalIdFieldArgs = [name]
  if (idFetcher) {
    globalIdFieldArgs.push(idFetcher)
  }
  return new GraphQLObjectType({
    name,
    interfaces: () => (interfaces || []).concat(nodeInterface),
    isTypeOf,
    fields: {
      id: globalIdField(...globalIdFieldArgs),
      [_.camelCase(`${name}Id`)]: {
        type: GraphQLString,
        resolve(...args) {
          const [parent] = args
          return idFetcher ? idFetcher(...args) : parent.id
        },
      },
      ...fields,
    },
  })
}

export const createEnum = (name, values) =>
  new GraphQLEnumType({ name, values })

export const createInterface = def => new GraphQLInterfaceType(def)
