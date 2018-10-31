import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isUndefinedNullEmpty } from '../../utils/utils'
import EmptyCellRenderer from '../EmptyCellRenderer'
import s from './SettlementStatusColumnRenderer.scss'

class SettlementStatusColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.string,
  }

  render() {
    const { value } = this.props

    if (isUndefinedNullEmpty(value)) return <EmptyCellRenderer />
    // TODO: Change the color of the message based on the status
    return <div className={s.pending}>{value}</div>
  }
}

export default SettlementStatusColumnRenderer
