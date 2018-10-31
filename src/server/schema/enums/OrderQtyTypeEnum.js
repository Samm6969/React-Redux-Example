import { createEnum } from '../schemaHelpers'

export default createEnum('OrderQtyTypeEnum', {
  CURRENCY: {},
  SHARES: {},
  UNITS: {},
  BASKETS: {},
  CASH: {},
})
