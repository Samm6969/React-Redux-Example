import React from 'react'
import PropTypes from 'prop-types'

import { toPercentString } from '../../utils/Stringify'

const PercentRenderer = ({ value, emptyCellText, style }) => (
  <span title={toPercentString(value)} style={style}>
    {value === undefined || value === null
      ? emptyCellText
      : toPercentString(value)}
  </span>
)

PercentRenderer.propTypes = {
  value: PropTypes.number,
  emptyCellText: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default PercentRenderer
