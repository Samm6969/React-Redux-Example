import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tooltip } from '@fc/react-playbook'

import TradingWindowsTable from './TradingWindowsTable'
import s from './TradingWindowsColumnRenderer.scss'
import EmptyCellRenderer from '../EmptyCellRenderer'
import FundHolidayRenderer from '../FundHolidayRenderer'

class TradingWindowsColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          endTime: PropTypes.string.isRequired,
          tradeWindowsId: PropTypes.number.isRequired,
          fundTimezoneName: PropTypes.string.isRequired,
          expectedPriceTime: PropTypes.string.isRequired,
          redEndTime: PropTypes.string.isRequired,
          subEndTime: PropTypes.string.isRequired,
        }),
      ),
    ),
    record: PropTypes.shape({
      fund: PropTypes.shape({
        supportTradeWindows: PropTypes.bool.isRequired,
      }),
    }),
  }

  render() {
    const { value, record } = this.props
    const supportTradeWindows = _.get(record, 'fund.supportTradeWindows')
    const fundWholeHoliday = _.get(record, 'fund.fundWholeHoliday')

    if (!supportTradeWindows) {
      return <EmptyCellRenderer />
    }

    if (fundWholeHoliday) {
      return <FundHolidayRenderer />
    }
    return (
      <Tooltip
        tooltipContentClassName={s.tooltipContent}
        content={<TradingWindowsTable windows={value} />}
      >
        <span className={s.window}>Multi</span>
      </Tooltip>
    )
  }
}

export default TradingWindowsColumnRenderer
