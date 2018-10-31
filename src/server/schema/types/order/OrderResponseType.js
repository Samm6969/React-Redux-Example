import { GraphQLList, GraphQLInt } from 'graphql'
import { createType } from '../../schemaHelpers'
import OrderRequestType from './OrderRequestType'
import FCErrorType from './FCErrorType'
import TradeValidationErrorType from './TradeValidationErrorType'
import OrderStatusEnum from '../../enums/OrderStatusEnum'
import FundAccountType from '../FundAccountType'

const OrderResponseType = {
  name: 'OrderResponse',
  fields: {
    orderRequest: {
      type: OrderRequestType,
    },
    orderId: {
      type: GraphQLInt,
    },
    orderStatus: {
      type: OrderStatusEnum,
    },
    tradeInputValidationErrors: {
      type: GraphQLList(FCErrorType),
    },
    tradeBusinessRulesValidationErrors: {
      type: GraphQLList(TradeValidationErrorType),
    },
    tradeComplianceRulesValidationErrors: {
      type: GraphQLList(TradeValidationErrorType),
    },
    fundAccount: {
      type: FundAccountType,
      async resolve(parent, args, context) {
        return context.getFundAccountByIds.load(
          JSON.stringify(parent.orderRequest.fundAccountId),
        )
      },
    },
  },
}
export default createType(OrderResponseType)
