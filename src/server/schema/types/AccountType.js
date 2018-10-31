import { GraphQLString, GraphQLBoolean } from 'graphql'

import { createType } from '../schemaHelpers'

import DivisionType from './DivisionType'
import ClientType from './ClientType'
import InstitutionLocationType from './InstitutionLocationType'
import AccountTypeEnum from '../enums/AccountTypeEnum'

const AccountType = {
  name: 'Account',
  fields: {
    name: {
      type: GraphQLString,
    },
    accountType: {
      type: AccountTypeEnum,
    },
    readIndicator: {
      type: GraphQLString,
    },
    executePermission: {
      type: GraphQLString,
    },
    tradeInstitution: {
      type: InstitutionLocationType,
    },
    division: {
      type: DivisionType,
      resolve(root) {
        return root.division
      },
    },
    client: {
      type: ClientType,
      resolve(root) {
        return root.client
      },
    },
    autoPopulateDefaultSsi: {
      type: GraphQLBoolean,
    },
  },
}

export default createType(AccountType)
