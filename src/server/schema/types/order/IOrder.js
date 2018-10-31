import { GraphQLInt, GraphQLFloat, GraphQLString, GraphQLID } from 'graphql'
import { createInterface } from '../../schemaHelpers'
import OrderSideEnum from '../../enums/OrderSideEnum'
import CurrencyType from '../CurrencyType'
import OrderStatusEnum from '../../enums/OrderStatusEnum'
import OrderQtyTypeEnum from '../../enums/OrderQtyTypeEnum'
import AssetTypeEnum from '../../enums/AssetTypeEnum'

const IOrder = {
  name: 'IOrder',
  fields: {
    id: { type: GraphQLID },
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
    currency: { type: CurrencyType },
    submitDate: { type: GraphQLString },
    updateDate: { type: GraphQLString },
    settlementDate: { type: GraphQLString },
    qtyDecimals: { type: GraphQLInt },
    numberOfApprovalsRequired: { type: GraphQLInt },
    numberOfApprovalsObtained: { type: GraphQLInt },
    underlyingAssetType: { type: AssetTypeEnum },

    // Missing fields:
    // notes - all
    // reject_void_reason - all
    // updated_by - all
    // added_by - all
    // order_sub_status - all
    // isin - all
  },
}

export default createInterface(IOrder)
