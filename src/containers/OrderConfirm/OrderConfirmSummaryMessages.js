import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  AlertBanner,
  DescriptionList,
  DescriptionListItem,
} from '@fc/react-playbook'

class OrderConfirmSummaryMessages extends Component {
  static propTypes = {
    tradeValidationSummaryMessages: PropTypes.arrayOf(PropTypes.string),
  }

  get alerts() {
    const { tradeValidationSummaryMessages } = this.props
    let alerts = []

    tradeValidationSummaryMessages.forEach(message => {
      const map = this.alertMap(message)
      alerts = alerts.concat(map)
    })

    return _.groupBy(_.orderBy(alerts, 'type', 'desc'), 'type')
  }

  alertMap = message => {
    const alerts = []
    switch (message) {
      case 'Hard Cutoff': // 0
        alerts.push({
          type: 'warning',
          term: 'Hard Cutoff',
          message: 'The order was placed after the cutoff time.',
        })
        alerts.push({
          type: 'attention',
          term: 'Soft Cutoff',
          message:
            'The order was placed after the cutoff time but can still be submitted for processing.  The Fund Processor may still reject the order.',
        })
        break
      case 'Market Value': // 1
        alerts.push({
          type: 'warning',
          term: 'Market Value Limit',
          message:
            "This order amount surpasses the institution's or applicable account(s) market value limit set at the fund level.  If you choose to process this order, Fund Connect will automatically reject the order.",
        })
        alerts.push({
          type: 'attention',
          term: 'Market Value Limit',
          message:
            "This order amount surpasses the institution's or applicable account(s) market value limit set at the fund level but can still be submitted for processing.",
        })
        break
      case 'Percentage Owned': // 2
        alerts.push({
          type: 'warning',
          term: '% Owned Limit',
          message:
            "This order amount surpasses the institution's or applicable account(s) % owned limit set at the fund level.  If you choose to process this order, Fund Connect will automatically reject the order.",
        })
        alerts.push({
          type: 'attention',
          term: 'Percentage Owned Limit',
          message:
            "This order amount surpasses the institution's or applicable account(s) % owned limit set at the fund level but can still be submitted for processing.",
        })
        break
      case 'Audit calculations could not be performed due to stale or insufficient data.': // 3
        alerts.push({
          type: 'attention',
          term: 'Incomplete Audit',
          message:
            'Audit calculations could not be performed due to stale or insufficient data.',
        })
        break
      case 'Before investing in mutual funds, it is important that you understand the sales charges, expenses and management fees that you may be charged. The prospectus link is displayed on the fund details page for the funds you are purchasing. Please click confirm to acknowledge that you have read and agreed to the terms as described': // 4
        alerts.push({
          type: 'attention',
          term: 'Prospectus Review',
          message:
            'Before investing in mutual funds, it is important that you understand the sales charges, expenses and management fees that you may be charged. The prospectus link is displayed on the fund details page for the funds you are purchasing. Please click confirm to acknowledge that you have read and agreed to the terms as described.',
        })
        break
      case 'Audit calculations will not be performed on future dated trades.': // 5
        alerts.push({
          type: 'attention',
          term: 'Future Dated Trade',
          message:
            'Audit calculations will not be performed on future dated trades.',
        })
        break
      case 'Trade Window': // 6
        alerts.push({
          type: 'warning',
          term: 'Trade Window',
          message:
            'The fund is closed for trading. If you choose to continue, this order will automatically be rejected.',
        })
        break
      case 'Trade Date': // 7
        alerts.push({
          type: 'warning',
          term: 'Trade Date',
          message:
            'The trade date can only be the next business day for this fund. If you choose to continue, this order will automatically be rejected.',
        })
        break
      case 'Override Cutoff': // 8
        alerts.push({
          type: 'attention',
          term: 'Override Cutoff',
          message:
            'Trade Cutoff and Trade Window validation have been bypassed.',
        })
        break
      case 'Future Trade': // 9
        alerts.push({
          type: 'attention',
          term: 'Trade Window',
          message:
            'Future dated trade is not supported for this fund. If you choose to continue, this order will automatically be rejected.',
        })
        break
      case 'Cash Payment Cutoff': // 10
        alerts.push({
          type: 'warning',
          term: 'Cash Payment Cutoff',
          message:
            'The payment request was placed after the custodian cash cutoff time.',
        })
        break
      case 'Trade Lead Days': // 11
        alerts.push({
          type: 'warning',
          term: 'Trade Lead Days',
          message:
            'Order must be submitted prior to trade date. If you choose to continue, this order will automatically be rejected.',
        })
        break
      case 'Before investing in mutual funds, it is important that you understand the sales charges, expenses and management fees that you may be charged. The prospectus and KIID links are displayed on the fund details page for the funds you are purchasing. Please click confirm to acknowledge that you have read and agreed to the terms as described': // 12
        alerts.push({
          type: 'attention',
          term: 'Prospectus Review',
          message:
            'Before investing in mutual funds, it is important that you understand the sales charges, expenses and management fees that you may be charged. The prospectus and KIID links are displayed on the fund details page for the funds you are purchasing. Please click confirm to acknowledge that you have read and agreed to the terms as described.',
        })
        break
      case 'Redemption Gate': // 13
        alerts.push({
          type: 'warning', // TODO - change to restricted
          term: 'Redemption Gate',
          message:
            'Redemption gate is in effect. It will not be possible to redeem shares until the gate has been lifted.',
        })
        break
      case 'Redemption Liquidity Fee': // 14
        alerts.push({
          type: 'attention',
          term: 'Redemption Liquidity Fee',
          message:
            'Redemption liquidity fee is currently in effect for this fund.',
        })
        break
      case 'Redemption Liquidity Fee (Estimated Fee Pct.)': // 15
        alerts.push({
          type: 'attention',
          term: 'Estimated Fee Percentage',
          message:
            'Redemption liquidity fee is currently in effect for this fund.',
        })
        break
      case 'Fund Daily Liquidity': // 16
        alerts.push({
          type: 'warning',
          term: 'Fund Daily Liquidity Limit',
          message:
            "Fund daily liquidity % value is below institution's or applicable account(s) hard limit. If you choose to process this order, Fund Connect will automatically reject the order.",
        })
        alerts.push({
          type: 'attention',
          term: 'Fund Daily Liquidity Limit',
          message:
            "Fund daily liquidity % value is below institution's or applicable account(s) soft limit. This order can be submitted for processing.",
        })
        break
      case 'Fund Weekly Liquidity': // 17
        alerts.push({
          type: 'warning',
          term: 'Fund Weekly Liquidity Limit',
          message:
            "Fund weekly liquidity % value is below institution's or applicable account(s) hard limit. If you choose to process this order, Fund Connect will automatically reject the order.",
        })
        alerts.push({
          type: 'attention',
          term: 'Fund Weekly Liquidity Limit',
          message:
            "Fund weekly liquidity % value is below institution's or applicable account(s) soft limit. This order can be submitted for processing.",
        })
        break
      case 'Fund Liquidity': // 18
        alerts.push({
          type: 'attention',
          term: 'Fund Liquidity',
          message: 'Fund does not report daily/weekly liquidity statistics.',
        })
        break
      case 'Approval Trade Size': // 19
        alerts.push({
          type: 'attention',
          term: 'Approval Trade Size',
          message:
            'Approval Required - Trade size surpasses the subscription/redemption limit set by the institution.',
        })
        break
      case 'Daily Subscription': // 20
        alerts.push({
          type: 'warning',
          term: 'Daily Subscription Limit',
          message:
            "This order amount surpasses your institution's or applicable account(s) daily subscription limit set at the fund level.  If you choose to continue, this order will automatically be rejected.",
        })
        alerts.push({
          type: 'attention',
          term: 'Daily Subscription Limit',
          message:
            "This order amount surpasses your institution's or applicable account(s) daily subscription limit set at the fund level but can still be submitted for processing.",
        })
        break
      default:
        break
    }
    return alerts
  }

  render() {
    const { alerts } = this
    return (
      <div>
        {Object.keys(alerts).map(type => (
          <AlertBanner
            key={type}
            type={type}
            message={
              <DescriptionList>
                {alerts[type].map(({ message, term }) => (
                  <DescriptionListItem key={message} term={term}>
                    {message}
                  </DescriptionListItem>
                ))}
              </DescriptionList>
            }
            show
            inline
          />
        ))}
      </div>
    )
  }
}

export default OrderConfirmSummaryMessages
