import { GraphQLBoolean } from 'graphql'

import { createType } from '../../schemaHelpers'

const ActionPermissionsType = {
  name: 'ActionPermissions',
  fields: {
    viewPendingReviewQueue: {
      type: GraphQLBoolean,
    },
    viewSettlementApprovalQueue: {
      type: GraphQLBoolean,
    },
    cancelOrders: {
      type: GraphQLBoolean,
    },
    approveOrders: {
      type: GraphQLBoolean,
    },
    approveSettlement: {
      type: GraphQLBoolean,
    },
  },
}

export default createType(ActionPermissionsType)
