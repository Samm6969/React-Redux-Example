import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  AlertBanner,
  DescriptionList,
  DescriptionListItem,
  List,
} from '@fc/react-playbook'

import s from './OrderConfirmList.scss'
import OrderFundGroup from '../OrderFundGroup'
import { getLongAccount } from '../../utils/Stringify'
import { isUndefinedNull } from '../../utils/utils'
import NumberFormatter from '../../components/NumberFormatter'
import DateFormatter from '../../components/DateFormatter'
import SettlementDateType from '../../enums/SettlementDateType'
import OrderConfirmTradeWindowRenderer from './OrderConfirmTradeWindowRenderer'
import OrderConfirmSettlementPeriodRenderer from './OrderConfirmSettlementPeriodRenderer'
import OrderConfirmCashInstructionRenderer from './OrderConfirmCashInstructionRenderer'
import OrderConfirmCustodyInstructionRenderer from './OrderConfirmCustodyInstructionRenderer'

class OrderConfirmList extends Component {
  static propTypes = {
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        fundAccount: PropTypes.shape({
          fund: PropTypes.object,
          account: PropTypes.object,
        }),
        orderRequest: PropTypes.shape({
          side: PropTypes.string,
        }),
      }),
    ),
  }

  getValidationErrors = order => {
    const {
      tradeBusinessRulesValidationErrors,
      tradeComplianceRulesValidationErrors,
      tradeInputValidationErrors,
    } = order

    let validationErrors = [
      ...tradeBusinessRulesValidationErrors,
      ...tradeComplianceRulesValidationErrors,
      ...tradeInputValidationErrors,
    ]

    validationErrors = validationErrors.map(({ errorLevel, ...rest }) => {
      let type = errorLevel.toLowerCase()
      if (type === 'warning') {
        type = 'attention'
      }
      if (type === 'error') {
        type = 'warning'
      }
      return {
        ...rest,
        errorLevel,
        type,
      }
    })

    return _.groupBy(_.orderBy(validationErrors, 'type', 'desc'), 'type')
  }

  settlementDateRenderer = settlementDate => {
    if (settlementDate === SettlementDateType.SAME_DAY) {
      return 'Same Day'
    }
    if (settlementDate === SettlementDateType.NEXT_DAY) {
      return 'Next Day'
    }
    return settlementDate
  }

  getOrderDetails = order => {
    const { fundAccount, orderRequest } = order
    const { account, fund } = fundAccount
    const {
      investorCashSettlementInstruction,
      investorCustodySettlementInstruction,
      side,
      redemptionFeeType,
      qtyType,
      quantity,
      tradeDate,
      userTradeWindowId,
      overriddenSettlementPeriod,
      comments,
      approvalMessage,
    } = orderRequest

    const hasCashInstructions = !isUndefinedNull(
      investorCashSettlementInstruction,
    )
    const hasCustodyInstructions = !isUndefinedNull(
      investorCustodySettlementInstruction,
    )

    const accountName = getLongAccount(account)

    return [
      {
        term: 'Account',
        value: <span title={accountName}>{accountName}</span>,
        show: true,
      },
      {
        term: 'Currency',
        value: fund.currency.currencyCode,
        show: true,
      },
      {
        term: 'Side',
        value: side,
        show: true,
      },
      {
        term: 'Redemption Type',
        value: redemptionFeeType,
        show: redemptionFeeType,
      },
      {
        term: 'Quantity Type',
        value: qtyType,
        show: true,
      },
      {
        term: 'Amount',
        value: (
          <strong>
            <NumberFormatter value={quantity} maximumFractionDigits={20} />
          </strong>
        ),
        show: true,
      },
      {
        term: 'Trade Date',
        value: <DateFormatter value={tradeDate} inputFormat="YYYY-MM-DD" />,
        show: true,
      },
      {
        term: 'Trade Window',
        value: (
          <OrderConfirmTradeWindowRenderer
            tradeWindowId={userTradeWindowId}
            order={order}
          />
        ),
        show: !isUndefinedNull(userTradeWindowId) && userTradeWindowId !== -1,
      },
      {
        term: 'Settlement Period',
        value: (
          <OrderConfirmSettlementPeriodRenderer
            tradeWindowId={userTradeWindowId}
            order={order}
          />
        ),
        show:
          !isUndefinedNull(userTradeWindowId) &&
          userTradeWindowId !== -1 &&
          userTradeWindowId !== 0,
      },
      {
        term: 'Settlement Date',
        value: this.settlementDateRenderer(overriddenSettlementPeriod),
        show: !isUndefinedNull(overriddenSettlementPeriod),
      },
      {
        term: 'Comments',
        value: comments,
        show: comments,
      },
      {
        term: 'Approval Messages',
        value: approvalMessage,
        show: approvalMessage,
      },
      {
        term: 'Cash Settlement Instructions',
        value: (
          <OrderConfirmCashInstructionRenderer
            cashInstructionId={investorCashSettlementInstruction}
            order={order}
          />
        ),
        show: hasCashInstructions,
      },
      {
        term: 'Custody Settlement Instructions',
        value: (
          <OrderConfirmCustodyInstructionRenderer
            custodyInstructionId={investorCustodySettlementInstruction}
            order={order}
          />
        ),
        show: hasCustodyInstructions,
      },
    ]
  }

  render() {
    const { orders } = this.props

    return orders.map(order => {
      const { fundAccount, id } = order
      const { fund } = fundAccount

      const validationMessages = this.getValidationErrors(order)

      const orderDetails = this.getOrderDetails(order)

      return (
        <OrderFundGroup key={id} fund={fund} showFundDetails={false}>
          <div className={s.order}>
            <div className={s.row}>
              <DescriptionList termWidth={250}>
                {orderDetails.map(({ term, value, show }) => {
                  if (!show) {
                    return null
                  }
                  return (
                    <DescriptionListItem key={term} term={term}>
                      {value}
                    </DescriptionListItem>
                  )
                })}
              </DescriptionList>
            </div>
            <div className={s.row}>
              {Object.keys(validationMessages).map(type => (
                <AlertBanner
                  key={type}
                  type={type}
                  message={
                    <List noStyle>
                      {validationMessages[type].map(
                        ({ errorCode, errorMessage }) => (
                          <li key={errorCode}>{errorMessage}</li>
                        ),
                      )}
                    </List>
                  }
                  show
                  inline
                />
              ))}
            </div>
          </div>
        </OrderFundGroup>
      )
    })
  }
}

export default OrderConfirmList
