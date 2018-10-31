import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import s from './AUMColumnRenderer.scss'
import NumberColumnRenderer from '../NumberColumnRenderer'
import ValueField from '../../components/ValueField'
import NumberFormatter from '../../components/NumberFormatter'
import DateFormatter from '../../components/DateFormatter'

class AUMColumnRenderer extends Component {
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
    let aumInMillions = value
    if (Number(value)) {
      aumInMillions = Number(value) / 1000000
    }
    const dtEffective = _.get(record, 'fund.statistics.dtEffective')
    const stale = _.get(record, 'fund.statistics.stale')
    // const priceStale = _.get(record, 'fund.statistics.priceStale')

    const tooltipContent = (
      <Fragment>
        <ValueField
          inline
          showDelimiter
          formGroupClassName={s.formGroup}
          label="Assets"
          value={<NumberFormatter value={value} />}
        />
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
        value={aumInMillions}
        isStale={stale}
        tooltipContent={tooltipContent}
      />
    )
  }
}

export default AUMColumnRenderer
