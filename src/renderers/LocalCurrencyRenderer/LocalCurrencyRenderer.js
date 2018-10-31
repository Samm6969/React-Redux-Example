import React from 'react'
import PropTypes from 'prop-types'
import { toLocalCurrencyString } from '../../utils/Stringify'

const LocalCurrencyRenderer = ({ value, emptyCellText, currency, style }) => {
  if (value === undefined || value === null) return <span>{emptyCellText}</span>
  return (
    <span title={toLocalCurrencyString(value, currency)} style={style}>
      {toLocalCurrencyString(value, currency)}
    </span>
  )
}

LocalCurrencyRenderer.propTypes = {
  value: PropTypes.number,
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    rateFromUSD: PropTypes.number.isRequired,
    rateToUSD: PropTypes.number.isRequired,
  }),
  emptyCellText: PropTypes.string.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default LocalCurrencyRenderer
