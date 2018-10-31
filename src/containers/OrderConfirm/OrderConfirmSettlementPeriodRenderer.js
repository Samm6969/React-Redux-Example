import { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import OrderSideType from '../../enums/OrderSideType'

class OrderConfirmSettlementPeriodRenderer extends Component {
  static propTypes = {
    tradeWindowId: PropTypes.number.isRequired,
    order: PropTypes.shape({
      orderRequest: PropTypes.shape({
        side: PropTypes.string,
      }),
      fundAccount: PropTypes.shape({
        tradeWindows: PropTypes.arrayOf(
          PropTypes.shape({
            tradeWindowsId: PropTypes.number,
          }),
        ),
      }),
    }).isRequired,
  }

  get tradeWindow() {
    const { tradeWindowId, order } = this.props
    const { fundAccount } = order
    const { tradeWindows } = fundAccount

    return _.find(
      tradeWindows,
      ({ tradeWindowsId }) => tradeWindowsId === tradeWindowId,
    )
  }

  render() {
    const { order } = this.props
    const { orderRequest } = order
    const { side } = orderRequest

    const { tradeWindow } = this

    return `T+${
      side === OrderSideType.BUY
        ? tradeWindow.subscriptionSettlementPeriod
        : tradeWindow.redemptionSettlementPeriod
    }`
  }
}

export default OrderConfirmSettlementPeriodRenderer
