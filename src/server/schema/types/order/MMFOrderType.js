import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from 'graphql'
import { createType } from '../../schemaHelpers'
import FundAccountType from '../FundAccountType'
import OrderQtyTypeEnum from '../../enums/OrderQtyTypeEnum'
import CurrencyType from '../CurrencyType'
import OrderStatusEnum from '../../enums/OrderStatusEnum'
import AssetTypeEnum from '../../enums/AssetTypeEnum'
import ReferenceIdTypeEnum from '../../enums/ReferenceIdTypeEnum'
import OrderSideEnum from '../../enums/OrderSideEnum'
import CashInstructionType from '../CashInstructionType'
import CustodyInstructionType from '../CustodyInstructionType'
import IOrder from './IOrder'

const MMFOrderType = {
  name: 'MMFOrder',
  idFetcher: ({ orderId }) => orderId,
  interfaces: [IOrder],
  isTypeOf(data) {
    // return !!data.fundAccountDTO
    return data.underlyingAssetType === 'MMFETF' || !data.underlyingAssetType
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

    // MMFOrder
    fundAccount: {
      type: FundAccountType,
      async resolve(parent, args, context) {
        return context.getFundAccountByIds.load(parent.fundAccountDTO.id)
      },
    },
    redemptionFee: { type: GraphQLFloat },
    redemptionFeeType: { type: GraphQLString },
    etfSecuritiesDealDate: { type: GraphQLString },
    etfOrderType: { type: GraphQLString },
    assistedTrade: { type: GraphQLBoolean },
    numberOfCashApprovalsRequired: { type: GraphQLInt },
    numberOfCashApprovalsObtained: { type: GraphQLInt },
    numberOfCustodyApprovalsRequired: { type: GraphQLInt },
    numberOfCustodyApprovalsObtained: { type: GraphQLInt },
    cashSettlementStatus: { type: GraphQLString },
    custodySettlementStatus: { type: GraphQLString },
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

    // Missing Fields:
    // comments - mmf
  },
}
export default createType(MMFOrderType)
