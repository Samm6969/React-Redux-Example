import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'
import { fromGlobalId } from 'graphql-relay'
import { GraphQLUpload } from 'apollo-server-express'
import { nodeField, nodesField } from './node'
import ViewerType from './types/ViewerType'
import CurrencyType from './types/CurrencyType'
import OrderResponsesType from './types/order/OrderResponsesType'
import OrderRequestsInput from './types/order/OrderRequestsInput'
import AftOrderRequestsInput from './types/aft/AftOrderRequestsInput'
import AftOrderResponsesType from './types/aft/AftOrderResponsesType'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    fields: {
      node: nodeField,
      nodes: nodesField,
      viewer: {
        type: ViewerType,
        resolve(root, args, context) {
          const { user } = context
          return user
        },
      },
      currencies: {
        type: GraphQLList(CurrencyType),
        async resolve(root, args, context) {
          const { axios, getCurrencies } = context

          const res = await axios.post(
            `/fundconnect/api/fndc/common/currencies`,
            {
              ids: [],
            },
          )

          return res.data.map(currency => {
            getCurrencies.prime(currency.id, currency)
            return currency
          })
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      enterOrders: {
        type: OrderResponsesType,
        args: {
          input: {
            type: GraphQLNonNull(OrderRequestsInput),
          },
        },
        resolve: (parent, { input }, context) =>
          context.enterOrders(
            input.orderRequests.map(orderRequest => {
              const fundAccountId = JSON.parse(
                fromGlobalId(orderRequest.fundAccountId).id,
              )
              return {
                ...orderRequest,
                fundAccountId,
              }
            }),
          ),
      },
      confirmOrders: {
        type: OrderResponsesType,
        args: {
          input: {
            type: GraphQLNonNull(OrderRequestsInput),
          },
        },
        resolve: (parent, { input }, context) =>
          context.confirmOrders(
            input.orderRequests.map(orderRequest => {
              const fundAccountId = JSON.parse(
                fromGlobalId(orderRequest.fundAccountId).id,
              )
              return {
                ...orderRequest,
                fundAccountId,
              }
            }),
          ),
      },
      enterAftOrders: {
        type: AftOrderResponsesType,
        args: {
          input: {
            type: GraphQLNonNull(AftOrderRequestsInput),
          },
        },
        resolve: (parent, { input }, context) =>
          context.enterAftOrders(input.aftOrderRequests),
      },
      confirmAftOrders: {
        type: AftOrderResponsesType,
        args: {
          input: {
            type: GraphQLNonNull(AftOrderRequestsInput),
          },
        },
        resolve: (parent, { input }, context) =>
          context.confirmAftOrders(input.aftOrderRequests),
      },
      uploadAftOrders: {
        type: AftOrderResponsesType,
        args: {
          file: { type: GraphQLUpload },
        },
        resolve: async (parent, { file }, context) => {
          const { stream, filename } = await file
          return context.uploadAftOrders(stream, filename)
        },
      },
    }),
  }),
})
