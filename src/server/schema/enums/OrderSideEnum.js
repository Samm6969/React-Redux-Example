import { createEnum } from '../schemaHelpers'

export default createEnum('OrderSideEnum', {
  BUY: {},
  SELL: {},
  CREATE: {},
  REDEEM: {},
  DIVIDEND_REINVEST: {},
  DIVIDEND_CASH: {},
  DIVIDEND_NOT_SUPPORTED: {},
  DIVIDEND_OTHER: {},
  UNKNOWN: {},
  DIVIDEND_REDUCTION: {},
})
