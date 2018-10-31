import {
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql'

import { createType } from '../schemaHelpers'
import BenchmarkType from './BenchmarkType'
import AssetClassType from './AssetClassType'
import CountryRegionType from './CountryRegionType'
import CurrencyType from './CurrencyType'
import FundQtyTypes from './FundQtyTypes'
import TimeZoneType from './TimeZoneType'
import ProviderType from './ProviderType'
import TrustType from './TrustType'
import FundCategoryType from './FundCategoryType'
import FundSubCategoryType from './FundSubCategoryType'
import IndustrySectorType from './IndustrySectorType'
import StatisticsType from './StatisticsType'
import DomicileCountryType from './DomicileCountryType'
import RedemptionFeeTypeEnum from '../enums/RedemptionFeeTypeEnum'
import AutoSettlementModelEnum from '../enums/AutoSettlementModelEnum'

const FundType = {
  name: 'Fund',
  fields: {
    assetClass: {
      type: AssetClassType,
      resolve(root, args, context) {
        if (root.assetClassId) {
          return context.getAssetClasses.load(root.assetClassId)
        }
        return null
      },
    },
    autoSettlementModel: { type: AutoSettlementModelEnum },
    benchmark: {
      type: BenchmarkType,
      resolve(root, args, context) {
        if (root.benchmarkId) {
          return context.getBenchmarks.load(root.benchmarkId)
        }
        return null
      },
    },
    contactName: { type: GraphQLString },
    contactPhone: { type: GraphQLString },
    countryRegion: {
      type: CountryRegionType,
      resolve(root, args, context) {
        if (root.countryRegionId) {
          return context.getCountryRegions.load(root.countryRegionId)
        }
        return null
      },
    },
    currency: {
      type: CurrencyType,
      resolve(root, args, context) {
        if (root.currencyId) {
          return context.getCurrencies.load(root.currencyId)
        }
        return null
      },
    },
    cusip: { type: GraphQLString },
    defaultPrice: { type: GraphQLString },
    domicileCountry: {
      type: DomicileCountryType,
      resolve(root, args, context) {
        if (root.domicileCountryId) {
          return context.getDomicileCountrys.load(root.domicileCountryId)
        }
        return null
      },
    },
    dtUpdRedCutoffTime: { type: GraphQLString },
    dtUpdSubCutoffTime: { type: GraphQLString },
    earlyCloseOrHoliday: { type: GraphQLBoolean },
    expectedUpdateDate: { type: GraphQLString },
    expenseRatio: { type: GraphQLFloat },
    fcTimeZone: { type: GraphQLString },
    timeZone: {
      type: TimeZoneType,
      resolve(root, args, context) {
        if (root.fcTimeZoneId) {
          return context.getTimezones.load(root.fcTimeZoneId)
        }
        return null
      },
    },
    fundCategory: {
      type: FundSubCategoryType,
      resolve(root, args, context) {
        if (root.fundCategoryId) {
          return context.getFundCategories.load(root.fundCategoryId)
        }
        return null
      },
    },
    fundSubCategory: {
      type: FundCategoryType,
      resolve(root, args, context) {
        if (root.fundSubCategoryId) {
          return context.getFundSubCategories.load(root.fundSubCategoryId)
        }
        return null
      },
    },
    fundType: { type: GraphQLString },
    fundWholeHoliday: { type: GraphQLBoolean },
    fund_category: { type: GraphQLString },
    industrySector: {
      type: IndustrySectorType,
      resolve(root, args, context) {
        if (root.industrySectorId) {
          return context.getIndustrySectors.load(root.industrySectorId)
        }
        return null
      },
    },
    isin: { type: GraphQLString },
    iso: { type: GraphQLString },
    longName: { type: GraphQLString },
    name: { type: GraphQLString },
    otherFundCode: { type: GraphQLString },
    redemptionFeeInEffect: { type: GraphQLBoolean },
    redemptionFeeType: { type: RedemptionFeeTypeEnum },
    redemptionFeePct: { type: GraphQLFloat },
    redemptionGate: { type: GraphQLBoolean },
    overrideSettlementDate: { type: GraphQLBoolean },
    fundRoutingAutoSettlementSupported: { type: GraphQLBoolean },
    providerSettlementInstructionAssociated: { type: GraphQLBoolean },
    supportedRedemptionFeeTypes: { type: GraphQLList(RedemptionFeeTypeEnum) },
    stableNav: { type: GraphQLBoolean },
    provider: {
      type: ProviderType,
      resolve(root, args, context) {
        if (root.providerId) {
          return context.getProviders.load(root.providerId)
        }
        return null
      },
    },
    redCutoffTime: { type: GraphQLString },
    redCutoffTimeType: { type: GraphQLString },
    sedol: { type: GraphQLString },
    settlementPeriod: {
      type: GraphQLFloat,
      description: 'Fund Settlement Period (without trade windows)',
    },
    splitRateInd: { type: GraphQLString },
    subCutoffTime: { type: GraphQLString },
    subCutoffTimeType: { type: GraphQLString },
    subscriptionGate: { type: GraphQLBoolean },
    supportTradeWindows: { type: GraphQLBoolean },
    taxable: { type: GraphQLBoolean },
    ticker: { type: GraphQLString },
    tradeable: { type: GraphQLBoolean },
    // trust: {type: GraphQLString},
    trust: {
      type: TrustType,
      resolve(root, args, context) {
        if (root.trustId) {
          return context.getTrusts.load(root.trustId)
        }
        return null
      },
    },
    statistics: {
      type: StatisticsType,
      resolve(root, args, context) {
        if (root.id) {
          return context.getStatistics.load(root.id)
        }
        return null
      },
    },
    fundQtyTypes: {
      type: FundQtyTypes,
      resolve(root, args, context) {
        if (root.id) {
          return context.getFundQtyTypeSides.load(root.id)
        }
        return null
      },
    },
    // name: {
    //   type: GraphQLString,
    // },
    // cusip: {
    //   type: GraphQLString,
    // },
    // contactName: {
    //   type: GraphQLString,
    // },
    // contactPhone: {
    //   type: GraphQLString,
    // },
    // expenseRatio: {
    //   type: GraphQLFloat,
    // },
    // isin: {
    //   type: GraphQLString,
    // },
    // iso: {
    //   type: GraphQLString,
    // },
    // longName: {
    //   type: GraphQLString,
    // },
    // otherFundCode: {
    //   type: GraphQLString,
    // },
    // redemptionFeeInEffect: {
    //   type: GraphQLBoolean,
    // },
    // redemptionGate: {
    //   type: GraphQLBoolean,
    // },
    // sedol: {
    //   type: GraphQLString,
    // },
    // subscriptionGate: {
    //   type: GraphQLBoolean,
    // },
    // taxable: {
    //   type: GraphQLBoolean,
    // },
    // ticker: {
    //   type: GraphQLString,
    // },
    // tradeable: {
    //   type: GraphQLBoolean,
    // },
    // fundType: {
    //   type: GraphQLString,
    // },

    // supportTradeWindows: {
    //   type: GraphQLBoolean,
    // },
    // subCutoffTime: {
    //   type: GraphQLFloat,
    // },
    // subCutoffTimeType: {
    //   type: GraphQLString,
    // },
    // redCutoffTime: {
    //   type: GraphQLFloat,
    // },
    // redCutoffTimeType: {
    //   type: GraphQLString,
    // },
    // country: {
    //   type: CountryRegionType,
    //   resolve(root, args, context) {
    //     if(root.countryId){return context.getCountries.load(root.countryId)} return null
    //   },
    // },
  },
}

export default createType(FundType)
