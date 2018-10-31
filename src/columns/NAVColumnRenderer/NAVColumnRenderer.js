import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import s from './NAVColumnRenderer.scss'
import NumberColumnRenderer from '../NumberColumnRenderer'
import ValueField from '../../components/ValueField'
import DateFormatter from '../../components/DateFormatter'

class NAVColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.node,
    record: PropTypes.shape({
      fund: PropTypes.shape({
        statistics: PropTypes.shape({
          stale: PropTypes.bool,
          dtEffective: PropTypes.string,
        }),
      }),
    }),
  }

  render() {
    const { value, record, ...props } = this.props

    const supportTradeWindows = _.get(record, 'fund.supportTradeWindows')
    // console.log(record)

    let isStale = false

    let tooltipContent = null
    if (supportTradeWindows) {
      isStale = _.get(record, 'fund.statistics.priceStale')
      // const priceDtEffective = _.get(record, 'fund.statistics.priceDtEffective')
      // const startTime = _.get(record, 'tradeWindows.startTime')
      // const priceDtEffective = _.get(record, 'fund.statistics.priceDtEffective')
      // TODO…
    } else {
      isStale = _.get(record, 'fund.statistics.stale')
      const dtEffective = _.get(record, 'fund.statistics.dtEffective')

      tooltipContent = (
        <ValueField
          inline
          showDelimiter
          formGroupClassName={s.formGroup}
          label="Effective Date"
          value={<DateFormatter value={dtEffective} />}
        />
      )
    }

    return (
      <NumberColumnRenderer
        {...props}
        value={value}
        isStale={isStale}
        tooltipContent={tooltipContent}
        options={{
          minimumFractionDigits: 0,
          maximumFractionDigits: 20,
        }}
      />
    )
  }
}

export default NAVColumnRenderer
