import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isUndefinedNull } from '../../utils/utils'
import EmptyCellRenderer from '../EmptyCellRenderer'

class TaxStatusColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.bool,
  }

  render() {
    const { value } = this.props
    if (isUndefinedNull(value)) {
      return <EmptyCellRenderer />
    }
    return value ? 'Taxable' : 'Tax Exempt'
  }
}

export default TaxStatusColumnRenderer
