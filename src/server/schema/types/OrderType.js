import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from 'graphql'
import { createType } from '../schemaHelpers'
import FundAccountType from './FundAccountType'
import OrderQtyTypeEnum from '../enums/OrderQtyTypeEnum'
import CurrencyType from './CurrencyType'
import OrderStatusEnum from '../enums/OrderStatusEnum'
import AssetTypeEnum from '../enums/AssetTypeEnum'
import ReferenceIdTypeEnum from '../enums/ReferenceIdTypeEnum'
import OrderSideEnum from '../enums/OrderSideEnum'
import CashInstructionType from './CashInstructionType'
import CustodyInstructionType from './CustodyInstructionType'

const OrderType = {
  name: 'Order',
  idFetcher: ({ orderId }) => orderId,
  fields: {
    orderId: { type: GraphQLInt },
    fundAccount: {
      type: FundAccountType,
      async resolve(parent, args, context) {
        return context.getFundAccountByIds.load(parent.fundAccountDTO.id)
      },
    },
    side: { type: OrderSideEnum },
    currencyId: {
      type: GraphQLInt,
    },
    currency: {
      type: CurrencyType,
      async resolve(parent, args, context) {
        return context.getCurrencies.load(parent.currencyId)
      },
    },
    price: { type: GraphQLFloat },
    totalShares: { type: GraphQLFloat },
    settlementAmt: { type: GraphQLFloat },
    redemptionFee: { type: GraphQLFloat },
    redemptionFeeType: { type: GraphQLString },

    orderStatus: { type: OrderStatusEnum },
    quantity: { type: GraphQLFloat },
    qtyType: { type: OrderQtyTypeEnum },
    qtyDecimals: { type: GraphQLInt },
    sharePrecision: { type: GraphQLInt },
    investorUid: { type: GraphQLString },
    submitDate: { type: GraphQLString },
    tradeDate: { type: GraphQLString },
    updateDate: { type: GraphQLString },
    settlementDate: { type: GraphQLString },
    etfSecuritiesDealDate: { type: GraphQLString },
    etfOrderType: { type: GraphQLString },
    assistedTrade: { type: GraphQLBoolean },
    numberOfApprovalsRequired: { type: GraphQLInt },
    numberOfApprovalsObtained: { type: GraphQLInt },
    numberOfCashApprovalsRequired: { type: GraphQLInt },
    numberOfCashApprovalsObtained: { type: GraphQLInt },
    numberOfCustodyApprovalsRequired: { type: GraphQLInt },
    numberOfCustodyApprovalsObtained: { type: GraphQLInt },
    cashSettlementStatus: { type: GraphQLString },
    custodySettlementStatus: { type: GraphQLString },
    underlyingAssetType: { type: AssetTypeEnum },
    referenceId: { type: GraphQLInt },
    referenceIdType: { type: ReferenceIdTypeEnum },
    cashInstruction: {
      type: CashInstructionType,
      resolve(parent) {
        return parent.cashInstruction
      },
    },
    custodyInstruction: {
      type: CustodyInstructionType,
      resolve(parent) {
        return parent.custodyInstruction
      },
    },
  },
}
export default createType(OrderType)
