import { GraphQLList, GraphQLInt } from 'graphql'
import { createType } from '../../schemaHelpers'
import AftOrderRequestType from './AftOrderRequestType'
import FCErrorType from '../order/FCErrorType'
import OrderStatusEnum from '../../enums/OrderStatusEnum'
import TradeValidationErrorType from '../order/TradeValidationErrorType'

const AftOrderResponseType = {
  name: 'AftOrderResponse',
  fields: {
    orderRequest: {
      type: AftOrderRequestType,
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
  },
}
export default createType(AftOrderResponseType)
