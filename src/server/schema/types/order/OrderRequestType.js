import { GraphQLString } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { createType } from '../../schemaHelpers'
import OrderRequestInput from './OrderRequestInput'

const OrderRequestType = {
  name: 'OrderRequest',
  fields: {
    ...OrderRequestInput.getFields(),
    fundAccountId: {
      type: GraphQLString,
      resolve(root) {
        return toGlobalId('FundAccount', JSON.stringify(root.fundAccountId))
      },
    },
  },
}
export default createType(OrderRequestType)
