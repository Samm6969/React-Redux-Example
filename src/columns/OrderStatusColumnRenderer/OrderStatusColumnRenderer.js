import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import s from './OrderStatusColumnRenderer.scss'

// TODO: Should render the status and a corresponding color
// TODO: Ask for clarification on what status maps to what color

class OrderStatusColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    record: PropTypes.shape({
      numberOfApprovalsRequired: PropTypes.number,
      numberOfApprovalsObtained: PropTypes.number,
    }),
    className: PropTypes.string,
  }

  render() {
    const { className, value, record } = this.props

    const isRejected = value === 'REJECTED'
    const isApprovalRequired = value === 'APPRV_REQ'

    const approvalsRequiredValue = `${value} (${
      record.order.numberOfApprovalsObtained
    }/${record.order.numberOfApprovalsRequired})`

    return (
      <div className={cx({ [`${s.rejected}`]: isRejected }, className)}>
        {isApprovalRequired ? approvalsRequiredValue : value}
      </div>
    )
  }
}

export default OrderStatusColumnRenderer
