import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const CapitalCaseColumnRenderer = ({ value }) => (
  <div>{_.capitalize(value)}</div>
)
CapitalCaseColumnRenderer.propTypes = {
  value: PropTypes.string,
}

export default CapitalCaseColumnRenderer
