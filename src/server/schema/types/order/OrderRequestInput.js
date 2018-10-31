import {
  GraphQLFloat,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql'
import OrderQtyTypeEnum from '../../enums/OrderQtyTypeEnum'
import OrderSideEnum from '../../enums/OrderSideEnum'
import RedemptionFeeTypeEnum from '../../enums/RedemptionFeeTypeEnum'

const OrderRequestInput = {
  name: 'OrderRequestInput',
  fields: {
    fundAccountId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    side: {
      type: OrderSideEnum,
    },
    qtyType: {
      type: OrderQtyTypeEnum,
    },
    quantity: {
      type: GraphQLFloat,
    },
    tradeDate: {
      type: GraphQLString,
    },
    redemptionFeeType: {
      type: RedemptionFeeTypeEnum,
    },
    overriddenSettlementPeriod: {
      type: GraphQLInt,
    },
    userTradeWindowId: {
      type: GraphQLInt,
    },
    investorCashSettlementInstruction: {
      type: GraphQLInt,
    },
    investorCustodySettlementInstruction: {
      type: GraphQLInt,
    },
    investorPaymentInstruction: {
      type: GraphQLInt,
    },
    comments: {
      type: GraphQLString,
    },
    approvalMessage: {
      type: GraphQLString,
    },
  },
}
export default new GraphQLInputObjectType(OrderRequestInput)
