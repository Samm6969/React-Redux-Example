import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import OrderConfirmList from './OrderConfirmList'
import OrderConfirmSummaryMessages from './OrderConfirmSummaryMessages'

class OrderConfirm extends Component {
  static propTypes = {
    enterOrders: PropTypes.shape({
      orderResponses: PropTypes.arrayOf(PropTypes.object),
      tradeValidationSummaryMessages: PropTypes.arrayOf(PropTypes.string),
    }),
  }

  render() {
    const { enterOrders } = this.props
    return (
      <Fragment>
        <OrderConfirmSummaryMessages
          tradeValidationSummaryMessages={
            enterOrders.tradeValidationSummaryMessages
          }
        />
        <OrderConfirmList orders={enterOrders.orderResponses} />
      </Fragment>
    )
  }
}

export default OrderConfirm
