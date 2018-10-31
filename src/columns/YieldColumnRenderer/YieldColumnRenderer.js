import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import s from './YieldColumnRenderer.scss'
import NumberColumnRenderer from '../NumberColumnRenderer'
import ValueField from '../../components/ValueField'
import DateFormatter from '../../components/DateFormatter'

class YieldColumnRenderer extends Component {
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

    const dtEffective = _.get(record, 'fund.statistics.dtEffective')
    const stale = _.get(record, 'fund.statistics.stale')
    // const priceStale = _.get(record, 'fund.statistics.priceStale')

    const tooltipContent = (
      <Fragment>
        <ValueField
          inline
          showDelimiter
          formGroupClassName={s.formGroup}
          label="Effective Date"
          value={<DateFormatter value={dtEffective} />}
        />
      </Fragment>
    )

    return (
      <NumberColumnRenderer
        {...props}
        value={_.isNumber(value) ? value * 100 : value}
        isStale={stale}
        tooltipContent={tooltipContent}
        options={{
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        }}
        formatter={localeValue => `${localeValue}%`}
      />
    )
  }
}

export default YieldColumnRenderer
