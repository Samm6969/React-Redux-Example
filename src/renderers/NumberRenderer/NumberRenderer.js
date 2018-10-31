import React from 'react'
import PropTypes from 'prop-types'

import { toNumberString } from '../../utils/Stringify'

const NumberRenderer = ({ value, emptyCellText, style }) => (
  <span title={toNumberString(value)} style={style}>
    {value === undefined || value === null
      ? emptyCellText
      : toNumberString(value)}
  </span>
)

NumberRenderer.propTypes = {
  value: PropTypes.number,
  emptyCellText: PropTypes.string.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default NumberRenderer
