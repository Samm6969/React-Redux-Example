import { createEnum } from '../schemaHelpers'

export default createEnum('OrderStatusEnum', {
  IN_PROGRESS: {},
  PENDING_FUTURE: {},
  COMPLETED: {},
  CANCELLED: {},
  REJECTED: {},
  VOIDED: {},
  SUBMITTED: {},
  ACCEPTED: {},
  APPRV_REQ: {},
  APPRV_DENIED: {},
  CREATED: {},
  PENDING_REVIEW: {},
})
