import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import NumberColumnRenderer from '../NumberColumnRenderer'

class QuantityColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    record: PropTypes.shape({
      order: PropTypes.shape({
        qtyDecimals: PropTypes.number.isRequired,
        qtyType: PropTypes.string.isRequired,
      }),
    }),
  }

  render() {
    const { value, record, ...props } = this.props

    const type = _.get(record, 'order.qtyType')
    const decimals = _.get(record, 'order.qtyDecimals')

    return (
      <NumberColumnRenderer
        {...props}
        value={value}
        options={{
          minimumFractionDigits: type === 'CURRENCY' ? 2 : decimals,
          maximumFractionDigits: type === 'CURRENCY' ? 2 : decimals,
        }}
      />
    )
  }
}

export default QuantityColumnRenderer
