import { GraphQLID, GraphQLList, GraphQLString } from 'graphql'
import { fromGlobalId } from 'graphql-relay'

import InstitutionLocationType from './InstitutionLocationType'
import AccountType from './AccountType'

import { createType } from '../schemaHelpers'
// import FundType from './FundType'
import FundAccountType from './FundAccountType'
// import FundType from './FundType'
import OrderType from './OrderType'
import FundType from './FundType'
import InvUserType from './user/InvUserType'
import MMFOrderType from './order/MMFOrderType'
import AFTOrderType from './order/AFTOrderType'
import IOrder from './order/IOrder'

const idFetcher = parent => parent.userid || parent.userId

const ViewerType = {
  name: 'Viewer',
  idFetcher,
  fields: {
    userId: {
      type: GraphQLString,
      resolve: idFetcher,
    },
    email: {
      type: GraphQLString,
    },
    usercountry: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    fc_authstring: {
      type: GraphQLString,
    },
    fc_othercountries: {
      type: GraphQLString,
    },
    institutionLocations: {
      type: GraphQLList(InstitutionLocationType),
      resolve(root, args, context) {
        const { getInvInstitutionLocations } = context
        return getInvInstitutionLocations()
      },
    },
    accountsByInstitutionLocation: {
      type: GraphQLList(AccountType),
      args: {
        institutionLocationId: {
          type: GraphQLID,
        },
      },
      resolve(root, args, context) {
        const { institutionLocationId } = args
        const { getInvInstitutionAccounts } = context

        return getInvInstitutionAccounts(
          institutionLocationId ? fromGlobalId(institutionLocationId).id : null,
        )
      },
    },
    fundAccountsForInstitution: {
      type: GraphQLList(FundAccountType),
      args: {
        institutionLocationId: {
          type: GraphQLID,
        },
        accountIds: {
          type: GraphQLList(GraphQLID),
        },
        accountType: {
          type: GraphQLString,
        },
        fundType: {
          type: GraphQLString,
        },
      },
      async resolve(root, args, context) {
        const {
          institutionLocationId,
          accountIds = [],
          accountType,
          fundType,
        } = args
        const { getTradeablefundAccountsForInstitution } = context

        return getTradeablefundAccountsForInstitution(
          institutionLocationId ? fromGlobalId(institutionLocationId).id : null,
          accountIds.map(accountId => fromGlobalId(accountId).id),
          accountType,
          fundType,
        )
      },
    },
    fundAccountsByIds: {
      type: GraphQLList(FundAccountType),
      args: {
        fundAccountIds: {
          type: GraphQLList(GraphQLID),
        },
      },
      resolve(root, args, context) {
        const keys = args.fundAccountIds || []
        const fundAccountIds = keys.map(key => fromGlobalId(key).id)
        return context.getFundAccountByIds.loadMany(fundAccountIds)
      },
    },
    recentOrders: {
      type: GraphQLList(IOrder),
      async resolve(root, args, context) {
        return context.getRecentOrders()
      },
    },
    searchOrders: {
      type: GraphQLList(OrderType),
      async resolve(partent, args, context) {
        return context.searchOrders()
      },
    },
    // TODO: this is a mock method, must provide actuall implementation
    searchFunds: {
      type: GraphQLList(FundType),
      args: {
        institutionLocationId: {
          type: GraphQLID,
        },
        accountIds: {
          type: GraphQLList(GraphQLID),
        },
        accountType: {
          type: GraphQLString,
        },
        fundType: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args, context) {
        const {
          institutionLocationId,
          accountIds = [],
          accountType,
          fundType,
        } = args

        const tradeablefundAccountsForInstitution = context.getTradeablefundAccountsForInstitution(
          institutionLocationId ? fromGlobalId(institutionLocationId).id : null,
          accountIds.map(accountId => fromGlobalId(accountId).id),
          accountType,
          fundType,
        )
        return tradeablefundAccountsForInstitution.then(fundAccounts =>
          context.getFunds.loadMany(
            fundAccounts.map(fundAccount => fundAccount.fund.id),
          ),
        )
      },
    },

    aftAccountNumbers: {
      type: GraphQLList(GraphQLString),
      async resolve(parent, args, context) {
        return context.getAftAccountNumbers()
      },
    },

    aftSampleFile: {
      type: GraphQLString,
      resolve(parent, args, context) {
        return context.getAftSampleFileUrl()
      },
    },

    investorPermissions: {
      type: InvUserType,
      async resolve(parent, args, context) {
        return context.investorPermissions()
      },
    },
    // TODO: this is a hack -
    //  without these queries MMFOrder and AFTOrder types
    //  are not picked up by the schemaPrinter.
    //  Find a better way - maybe apollo's schema-first approach?
    mmf: {
      type: MMFOrderType,
    },
    aft: {
      type: AFTOrderType,
    },
  },
}

export default createType(ViewerType)
