import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
// import { Badge, Button } from '@fc/react-playbook'

import s from './TradeBlotterFilterButton.scss'

class TradeBlotterFilterButton extends Component {
  static propTypes = {
    filterName: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    // badgeType: Badge.propTypes.type,
    isActive: PropTypes.bool,
    handleClick: PropTypes.func,
    count: PropTypes.objectOf(PropTypes.number),
  }

  render() {
    const {
      filterName,
      displayName,
      // badgeType,
      count = 0,
      handleClick,
      isActive,
    } = this.props

    const isCompletedFilter = filterName === 'COMPLETED'
    const isRejectedFilter = filterName === 'REJECTED'

    const className = cx(s.filter, {
      [s.active]: isActive,
      [s.completed]: isCompletedFilter,
      [s.rejected]: isRejectedFilter,
    })
    return (
      <span className={className} onClick={() => handleClick(filterName)}>
        {displayName} ({count})
      </span>
    )
  }
}

export default TradeBlotterFilterButton
