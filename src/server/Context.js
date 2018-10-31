/* eslint-disable no-console */
import axios from 'axios'
import DataLoader from 'dataloader'
import { performance } from 'perf_hooks'
import FormData from 'form-data'
import _ from 'lodash'

import { UnauthorizedError } from './errors'
import { mapTo, mapToValues } from './utils'
import { logger } from './logger'

const timings = {}

axios.interceptors.request.use(req => {
  const url = req.baseURL + req.url
  timings[url] = performance.now()
  return req
})

axios.interceptors.response.use(res => {
  const endTime = performance.now()
  const startTime = timings[res.config.url]

  const args = [res.config.url]
  if (res.data && Array.isArray(res.data)) {
    args.push(`res data length: ${res.data.length}`)
  }

  if (startTime) {
    args.push(`response time: ${endTime - startTime}ms`)
  }

  console.log(args.join(', '))
  return res
})

class Context {
  request

  constructor(request) {
    this.request = request
    this.axios = axios
    this.axios.defaults.baseURL =
      process.env.API_SERVER || `http://127.0.0.1:${process.env.FNDC_API_PORT}`
    logger.info(`this.axios.defaults.baseURL=${this.axios.defaults.baseURL}`)
    this.axios.defaults.headers.common = {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Expires: '-1',
      Connection: 'keep-alive',
      'fc-app': 'inv',
      ...this.axios.defaults.headers.common,
      ...this.request.headers,
    }
    // console.log(this.axios.defaults.headers.common)
    if (process.env.NODE_ENV !== 'production') {
      const userid = this.request.headers.userid || this.request.query.userId
      this.axios.defaults.params = {
        demo_user: userid,
        ...this.axios.defaults.params,
      }
    }
  }

  get user() {
    return new Promise(resolve => {
      resolve({
        ...this.request.headers,
      })
    })
  }

  getInvInstitutionLocation = new DataLoader(async keys => {
    // console.log('getInvInstitutionLocation', keys)
    try {
      const data = await this.getInvInstitutionLocations()
      return _.filter(data, item => keys.includes(`${item.id}`))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getInvInstitutionLocations = async () => {
    // console.log('getInvInstitutionLocations')
    try {
      const res = await this.axios.get(
        '/fundconnect/api/fndc/inv/trade/institutions',
      )
      _.forEach(res.data, invInstitutionLocation => {
        this.getInvInstitutionLocation.prime(
          invInstitutionLocation.id,
          invInstitutionLocation,
        )
      })
      return res.data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  getInvInstitutionAccounts = async (
    invInstLocationId = null,
    invAccountIds = [],
  ) => {
    // console.log('getInvInstitutionAccounts', keys)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/inv/trade/accounts`, {
          invInstLocationId,
          invAccountIds,
        })
        .then(res => res.data)
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  getAccounts = new DataLoader(async keys => {
    // console.log('getFunds', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/inv/trade/accounts`, {
          invAccountIds: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getTradeablefundAccountsForInstitution = async (
    invInstLocationId,
    invAccountIds = [],
    accountType,
    fundType,
  ) => {
    try {
      const res = await this.axios.post(
        `/fundconnect/api/fndc/inv/fund-accounts`,
        {
          invInstLocationId,
          invAccountIds,
          accountType,
          fundType,
        },
      )

      return res.data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  getFunds = new DataLoader(async keys => {
    // console.log('getFunds', keys, keys.length)
    // console.log(keys)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/funds`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getStatistics = new DataLoader(async keys => {
    // console.log('getTrustes', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/funds/statistics`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getBenchmarks = new DataLoader(async keys => {
    // console.log('getBenchmarks', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/fund/benchmarks`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getAssetClasses = new DataLoader(async keys => {
    // console.log('getAssetClasses', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/fund/asset-classes`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getCountries = new DataLoader(async keys => {
    // console.log('getCountries', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/common/countries`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getCountryRegions = new DataLoader(async keys => {
    // console.log('getCountryRegions', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/common/country-regions`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getDomicileCountrys = new DataLoader(async keys => {
    // console.log('getCountryRegions', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/common/countries`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getCurrencies = new DataLoader(async keys => {
    // console.log('getCurrencies', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/common/currencies`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getFundCategories = new DataLoader(async keys => {
    // console.log('getFundCategories', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/fund/fund-categories`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getFundSubCategories = new DataLoader(async keys => {
    // console.log('getFundSubCategories', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/fund/fund-subcategories`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getIndustrySectors = new DataLoader(async keys => {
    // console.log('getIndustrySectors', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/fund/industry-sectors`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getProviders = new DataLoader(async keys => {
    // console.log('getProviders', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/providers`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getTimezones = new DataLoader(async keys => {
    // console.log('getTimezones', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/common/timezones`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getTrusts = new DataLoader(async keys => {
    // console.log('getTrustes', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/fund/trusts`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getFundAccountByIds = new DataLoader(async keys => {
    try {
      const params = keys.map(JSON.parse)

      return await this.axios
        .post(`/fundconnect/api/fndc/inv/fund-accounts/byids`, {
          ids: params,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getTradeWindows = new DataLoader(async keys => {
    // console.log('getTrustes', keys, keys.length)
    try {
      const params = keys.map(JSON.parse)
      return await this.axios
        .post(`/fundconnect/api/fndc/inv/fund-accounts/trade-windows`, {
          fundAccountIds: params,
        })
        .then(res => res.data)
        .then(
          mapToValues(keys, ({ id }) => id, ({ tradeWindows }) => tradeWindows),
        )
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getFundQtyTypeSides = new DataLoader(async keys => {
    // console.log('getFundQtyTypeSides', keys, keys.length)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/fund/fund-qty-type-sides`, {
          ids: keys,
        })
        .then(res => res.data)
        .then(mapTo(keys, ({ id }) => id))
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getCashSettlementInstructions = new DataLoader(async keys => {
    // console.log('cash-instructions', keys, keys.length)

    const params = keys.map(JSON.parse)

    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/inv/trade/cash-instructions`, {
          ids: params,
        })
        .then(res => res.data)
        .then(
          mapToValues(
            keys,
            ({ id }) => id,
            ({ cashInstructions }) => cashInstructions,
          ),
        )
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getCustodySettlementInstructions = new DataLoader(async keys => {
    // console.log('custody-instructions', keys, keys.length)

    const params = keys.map(JSON.parse)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/inv/trade/custody-instructions`, {
          ids: params,
        })
        .then(res => res.data)
        .then(
          mapToValues(
            keys,
            ({ id }) => id,
            ({ custodyInstructions }) => custodyInstructions,
          ),
        )
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  getPaymentInstructions = new DataLoader(async keys => {
    // console.log('payment-instructions', keys, keys.length)

    const params = keys.map(JSON.parse)
    try {
      return await this.axios
        .post(`/fundconnect/api/fndc/inv/trade/payment-instructions`, {
          ids: params,
        })
        .then(res => res.data)
        .then(
          mapToValues(
            keys,
            ({ id }) => id,
            ({ cashInstructions }) => cashInstructions,
          ),
        )
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  })

  enterOrders = async orderRequests => {
    try {
      return await this.axios
        .post(
          `/fundconnect/api/fndc/inv/orders/direct/enter-orders`,
          orderRequests,
        )
        .then(res => res.data)
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  confirmOrders = async orderRequests => {
    try {
      return await this.axios
        .post(
          `/fundconnect/api/fndc/inv/orders/direct/confirm-orders`,
          orderRequests,
        )
        .then(res => res.data)
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  getRecentOrders = async () => {
    try {
      const res = await this.axios.post(
        `/fundconnect/api/fndc/inv/orders/recent-orders`,
      )
      return res.data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  searchOrders = async () => {
    try {
      const res = await this.axios.post(
        `/fundconnect/api/fndc/inv/orders/trade-activity`,
        {
          filter: {
            orderDateFrom: '2018-01-01',
            orderDateTo: '2018-10-03',
          },
          page: {
            pageSize: 100,
            start: 0,
          },
        },
      )
      return res.data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  getAftAccountNumbers = async () => {
    try {
      const res = await this.axios.get(
        `/fundconnect/api/fndc/inv/orders/aft/account-numbers`,
      )
      return res.data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  enterAftOrders = async aftOrderRequests => {
    try {
      return await this.axios
        .post(
          `/fundconnect/api/fndc/inv/orders/aft/enter-orders`,
          aftOrderRequests,
        )
        .then(res => res.data)
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  confirmAftOrders = async orderRequests => {
    try {
      return await this.axios
        .post(
          `/fundconnect/api/fndc/inv/orders/aft/confirm-orders`,
          orderRequests,
        )
        .then(res => res.data)
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  uploadAftOrders = async (stream, filename) => {
    try {
      const formData = new FormData()
      formData.append('file', stream, { filename })
      return await this.axios
        .post(`/fundconnect/api/fndc/inv/orders/aft/upload-orders`, formData, {
          headers: formData.getHeaders(),
        })
        .then(res => res.data)
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  getAftSampleFileUrl = () =>
    `${process.env.APP_URI}/orders/aft/upload-orders/sample`

  investorPermissions = async () => {
    try {
      const res = await this.axios.get(`/fundconnect/api/fndc/inv/user`)
      return res.data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  /*
   * Authentication and permissions.
   */
  ensureIsAuthenticated() {
    if (!this.user) throw new UnauthorizedError()
  }
}

export default Context
