import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DateFormatter from '../../components/DateFormatter'
import EmptyCellRenderer from '../EmptyCellRenderer'
import { isUndefinedNullEmpty } from '../../utils/utils'

class DateColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.string,
  }

  render() {
    // TODO: make sure this follows the correct date format
    const { value } = this.props
    if (isUndefinedNullEmpty(value)) return <EmptyCellRenderer />
    return <DateFormatter value={value} />
  }
}

export default DateColumnRenderer
