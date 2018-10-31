import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import momentPropTypes from 'react-moment-proptypes'

import NumberColumnRenderer from '../NumberColumnRenderer'
import DateFormatter from '../../components/DateFormatter'
import ValueField from '../../components/ValueField'

class BalanceCCYEColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.number,
    record: PropTypes.shape({
      balance: PropTypes.shape({
        stale: PropTypes.bool,
        balanceDt: PropTypes.oneOfType([
          PropTypes.string,
          momentPropTypes.momentObj,
        ]),
      }),
    }),
  }

  render() {
    const { value, record, ...rest } = this.props
    const balanceDt = _.get(record, 'balance.balanceDt')
    const stale = _.get(record, 'balance.stale')
    const fxStale = _.get(record, 'balance.fxRateDTO.stale')

    const tooltipContent = (
      <ValueField
        inline
        showDelimiter
        label="Effective Date"
        value={<DateFormatter value={balanceDt} />}
      />
    )

    return (
      <NumberColumnRenderer
        {...rest}
        value={value}
        isStale={stale || fxStale}
        tooltipContent={tooltipContent}
      />
    )
  }
}

export default BalanceCCYEColumnRenderer
