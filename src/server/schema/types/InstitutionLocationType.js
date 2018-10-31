import { GraphQLBoolean } from 'graphql'

import InstitutionType from './InstitutionType'
import LocationType from './LocationType'
// import AccountType from './AccountType'
import { createType } from '../schemaHelpers'

const InstitutionLocationType = {
  name: 'InstitutionLocation',
  fields: {
    self: {
      type: GraphQLBoolean,
    },
    institution: {
      type: InstitutionType,
      resolve(root) {
        return root.institution
      },
    },
    location: {
      type: LocationType,
      resolve(root) {
        return root.location
      },
    },
  },
}

export default createType(InstitutionLocationType)
