/* eslint-disable global-require */
import { nodeDefinitions, fromGlobalId } from 'graphql-relay'

import { assignType, getType } from '../utils'

// import ViewerType from './types/ViewerType'
// import InstitutionLocationType from './types/InstitutionLocationType'
// import AccountType from './types/AccountType'
// import FundType from './types/FundType'

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId)
    switch (type) {
      case 'Viewer':
        return context.user.then(assignType('Viewer'))
      case 'InstitutionLocation':
        return context.getInvInstitutionLocation
          .load(id)
          .then(assignType('InstitutionLocation'))
      case 'Account':
        return context.getInvInstitutionAccounts
          .load(id)
          .then(assignType('Account'))
      case 'Fund':
        return context.getFunds.load(Number(id)).then(assignType('Fund'))
      case 'FundAccount':
        return context.getFundAccountByIds
          .load(id)
          .then(assignType('FundAccount'))
      case 'FundQtyTypes':
        return context.getFunds
          .load(Number(id))
          .then(assignType('FundQtyTypes'))
      default:
        return null
    }
  },
  obj => {
    switch (getType(obj)) {
      case 'Viewer':
        return require('./types/ViewerType').default
      case 'InstitutionLocation':
        return require('./types/InstitutionLocationType').default
      case 'Account':
        return require('./types/AccountType').default
      case 'Fund':
        return require('./types/FundType').default
      case 'FundAccount':
        return require('./types/FundAccountType').default
      case 'FundQtyTypes':
        return require('./types/FundQtyTypes').default
      default:
        return null
    }
  },
)
