import React, { Component } from 'react'
import PropTypes from 'prop-types'

import s from './TradeBlotterFilters.scss'
import TradeBlotterFilterButton from './TradeBlotterFilterButton'

class TradeBlotterFilters extends Component {
  static propTypes = {
    selectedStatus: PropTypes.string,
    handleFilterChange: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    counts: PropTypes.any,
  }

  // TODO: Figure out Settlement Approval Required
  filters = [
    {
      filterName: 'APPRV_REQ',
      displayName: 'Approval Required',
      // badgeType: 'warn',
    },
    {
      filterName: 'SUBMITTED',
      displayName: 'Submitted',
    },
    {
      filterName: 'PENDING_REVIEW',
      displayName: 'Pending Review',
    },
    {
      filterName: 'IN_PROGRESS',
      displayName: 'In Progress',
    },
    {
      filterName: 'COMPLETED',
      displayName: 'Completed',
      badgeType: 'success',
    },
    {
      filterName: 'REJECTED',
      displayName: 'Rejected',
      badgeType: 'error',
    },
    {
      filterName: 'APPRV_DENIED',
      displayName: 'Approval Denied',
    },
  ]

  render() {
    const { selectedStatus, handleFilterChange, counts } = this.props
    return (
      <div className={s.container}>
        {this.filters.map(filter => (
          <TradeBlotterFilterButton
            {...filter}
            count={counts[filter.filterName]}
            handleClick={handleFilterChange}
            key={filter.filterName}
            isActive={selectedStatus === filter.filterName}
          />
        ))}
      </div>
    )
  }
}

export default TradeBlotterFilters
