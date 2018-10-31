import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toCurrencyString } from '../../utils/Stringify'

class CurrencyRenderer extends Component {
  static propTypes = {
    value: PropTypes.number,
    currency: PropTypes.string,
    emptyCellText: PropTypes.string.isRequired,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  render() {
    const { value, currency, emptyCellText, style } = this.props
    const displayValue =
      value === undefined || value === null
        ? emptyCellText
        : toCurrencyString(value, currency)
    return (
      <span title={displayValue} style={style}>
        {displayValue}
      </span>
    )
  }
}

export default CurrencyRenderer
