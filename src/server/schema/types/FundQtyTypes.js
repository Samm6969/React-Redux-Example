import QtyTypes from './QtyTypes'
import { createType } from '../schemaHelpers'

const FundQtyTypes = {
  name: 'FundQtyTypes',
  fields: {
    direct: {
      type: QtyTypes,
      resolve(root) {
        return root.fundQtyTypeSidesForDirect
      },
    },

    nonDirect: {
      type: QtyTypes,
      resolve(root) {
        return root.fundQtyTypeSidesForNonDirect
      },
    },
  },
}

export default createType(FundQtyTypes)
