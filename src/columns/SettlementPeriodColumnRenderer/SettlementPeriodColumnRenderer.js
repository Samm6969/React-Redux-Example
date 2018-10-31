import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import EmptyCellRenderer from '../EmptyCellRenderer'
import { isUndefinedNull } from '../../utils/utils'
import FundHolidayRenderer from '../FundHolidayRenderer'

class SettlementPeriodColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.number,
    // data: PropTypes.shape({
    //   fund: PropTypes.shape({
    //     supportTradeWindows: PropTypes.bool.isRequired,
    //   }),
    // }),
  }

  state = {}

  static getDerivedStateFromProps(props) {
    const { data } = props
    const settlementPeriods = new Set()
    const supportTradeWindows = _.get(data, 'fund.supportTradeWindows')
    const fundWholeHoliday = _.get(data, 'fund.fundWholeHoliday')

    if (!data || !supportTradeWindows) {
      return {
        supportTradeWindows,
      }
    }

    _.forEach(data.tradeWindows, tradeWindows => {
      _.forEach(
        tradeWindows,
        ({ subscriptionSettlementPeriod, redemptionSettlementPeriod }) => {
          if (!isUndefinedNull(subscriptionSettlementPeriod)) {
            settlementPeriods.add(subscriptionSettlementPeriod)
          }
          if (!isUndefinedNull(redemptionSettlementPeriod)) {
            settlementPeriods.add(redemptionSettlementPeriod)
          }
        },
      )
    })

    return {
      settlementPeriods: Array.from(settlementPeriods.values()),
      supportTradeWindows,
      fundWholeHoliday,
    }
  }

  formatSettlementPeriod = settlementPeriod => `T+${settlementPeriod}`

  render() {
    const { value } = this.props
    const {
      settlementPeriods,
      supportTradeWindows,
      fundWholeHoliday,
    } = this.state

    const isEmpty = isUndefinedNull(value)

    if (fundWholeHoliday) {
      return <FundHolidayRenderer />
    }

    if (supportTradeWindows) {
      return settlementPeriods.map(this.formatSettlementPeriod).join(' | ')
    }

    if (isEmpty) {
      return <EmptyCellRenderer />
    }

    return `T+${value}`
  }
}

export default SettlementPeriodColumnRenderer
