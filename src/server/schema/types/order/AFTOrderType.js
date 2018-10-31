import { GraphQLFloat, GraphQLInt, GraphQLString } from 'graphql'
import { createType } from '../../schemaHelpers'
import OrderQtyTypeEnum from '../../enums/OrderQtyTypeEnum'
import CurrencyType from '../CurrencyType'
import OrderStatusEnum from '../../enums/OrderStatusEnum'
import AssetTypeEnum from '../../enums/AssetTypeEnum'
import OrderSideEnum from '../../enums/OrderSideEnum'
import IOrder from './IOrder'

const AFTOrderType = {
  name: 'AFTOrder',
  idFetcher: ({ orderId }) => orderId,
  interfaces: [IOrder],
  isTypeOf(data) {
    return data.underlyingAssetType === 'AFT'
  },
  fields: {
    // IOrder
    orderId: { type: GraphQLInt },
    tradeDate: { type: GraphQLString },
    price: { type: GraphQLFloat },
    settlementAmt: { type: GraphQLFloat },
    totalShares: { type: GraphQLFloat },
    investorUid: { type: GraphQLString },
    qtyType: { type: OrderQtyTypeEnum },
    quantity: { type: GraphQLFloat },
    sharePrecision: { type: GraphQLInt },
    side: { type: OrderSideEnum },
    orderStatus: { type: OrderStatusEnum },
    currencyId: { type: GraphQLInt },
    currency: {
      type: CurrencyType,
      async resolve(parent, args, context) {
        return context.getCurrencies.load(parent.currencyId)
      },
    },
    submitDate: { type: GraphQLString },
    updateDate: { type: GraphQLString },
    settlementDate: { type: GraphQLString },
    qtyDecimals: { type: GraphQLInt },
    numberOfApprovalsRequired: { type: GraphQLInt },
    numberOfApprovalsObtained: { type: GraphQLInt },
    underlyingAssetType: { type: AssetTypeEnum },

    // AFTOrder
    fundName: { type: GraphQLString },
    invAccountName: { type: GraphQLString },
    fundCodeType: { type: GraphQLString },
  },
}
export default createType(AFTOrderType)
