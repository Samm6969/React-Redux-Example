import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import TimeFormatter from '../../components/TimeFormatter'
import OrderSideType from '../../enums/OrderSideType'

class OrderConfirmTradeWindowRenderer extends Component {
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
    const { tradeWindowId, order } = this.props
    const { orderRequest } = order
    const { side } = orderRequest

    if (tradeWindowId === 0) {
      return 'Next Available'
    }

    const { tradeWindow } = this

    const startTime = <TimeFormatter time={tradeWindow.startTime} />
    let endTime = null

    if (side === OrderSideType.SELL) {
      endTime = <TimeFormatter time={tradeWindow.redEndTime} />
    }

    if (side === OrderSideType.BUY) {
      endTime = <TimeFormatter time={tradeWindow.subEndTime} />
    }

    return (
      <Fragment>
        {startTime} - {endTime}
      </Fragment>
    )
  }
}

export default OrderConfirmTradeWindowRenderer
