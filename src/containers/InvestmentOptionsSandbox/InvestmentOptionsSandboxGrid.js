import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment-timezone'

import { AgGrid } from '../../components/AgGrid'

class InvestmentOptionsSandboxGrid extends Component {
  static propTypes = {
    query: PropTypes.string,
    loading: PropTypes.bool,
    viewer: PropTypes.shape({
      fundAccountsForInstitution: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
      ),
    }),
    onDataLoad: PropTypes.func,
  }

  static defaultProps = {
    viewer: {
      fundAccountsForInstitution: [],
    },
  }

  state = {
    data: [],
    queryResult: [],
  }

  componentDidUpdate() {
    const { onDataLoad, loading } = this.props
    if (typeof onDataLoad === 'function' && !loading) {
      const { data, queryResult } = this.state
      onDataLoad({
        data,
        totalCount: data.length,
        displayCount: queryResult.length,
      })
    }
  }

  static getDerivedStateFromProps(props) {
    const { loading, query } = props

    if (!loading) {
      const {
        viewer: { fundAccountsForInstitution = [] },
      } = props

      const groupedByData = _.groupBy(
        _.sortBy(fundAccountsForInstitution, 'fund.name'),
        'fund.id',
      )

      const data = _.map(
        groupedByData,
        fundAccounts => {
          const allTradeWindows = []
          const accumulatedBalance = _.reduce(
            fundAccounts,
            (acc, fundAccount) => {
              const { balance, tradeWindows } = fundAccount
              const { balanceDt, fxRateDTO } = balance

              const accFun = (value, key) => {
                if (typeof value === 'number') {
                  // eslint-disable-next-line operator-assignment
                  acc[key] = (acc[key] || 0) + value
                }

                if (typeof value === 'boolean') {
                  acc[key] = balance[key] || acc[key]
                }
                // if(typeof value === 'object') {
                //   acc[key] = _.forEach()
                // }
              }

              _.forEach(balance, accFun)

              if (!acc.balanceDt) {
                acc.balanceDt = moment(balanceDt).toISOString()
                acc.fxRateDTO = fxRateDTO
              }
              acc.balanceDt = moment
                .max(moment(acc.balanceDt), moment(balanceDt))
                .toISOString()

              if (moment(acc.balanceDt).isSame(balanceDt)) {
                acc.fxRateDTO = fxRateDTO
              }

              if (
                tradeWindows &&
                Array.isArray(tradeWindows) &&
                tradeWindows.length !== 0
              ) {
                allTradeWindows.push(tradeWindows)
              }

              return {
                ...acc,
              }
            },
            {
              stale: false,
            },
          )

          const { fund } = _.head(fundAccounts)

          return {
            fund,
            balance: accumulatedBalance,
            accounts: fundAccounts,
            tradeWindows: allTradeWindows,
          }
        },
        [],
      )

      return {
        data,
        queryResult: _.filter(
          data,
          record =>
            _.toLower(record.fund.name).indexOf(_.toLower(query)) !== -1,
        ),
      }
    }
    return null
  }

  render() {
    const { queryResult } = this.state
    // console.log(this.props)
    return (
      <AgGrid
        rowData={queryResult}
        {...this.props}
        rowSelection="multiple"
        suppressRowClickSelection
      />
    )
  }
}

export default InvestmentOptionsSandboxGrid
