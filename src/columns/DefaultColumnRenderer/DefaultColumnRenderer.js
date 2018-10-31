import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { isUndefinedNull } from '../../utils/utils'
import EmptyCellRenderer from '../EmptyCellRenderer'

class DefaultColumnRenderer extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
  }

  render() {
    const { value } = this.props
    if (isUndefinedNull(value) || _.isEmpty(value)) {
      return <EmptyCellRenderer />
    }
    return value
  }
}

export default DefaultColumnRenderer
