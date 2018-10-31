import { createEnum } from '../../schemaHelpers'

export default createEnum('TradeValidationErrorLevelEnum', {
  ERROR: {},
  WARNING: {},
  RESTRICTED: {},
})
