import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormSection, Field } from 'redux-form'
import { Collapsible } from '@fc/react-playbook'
import cx from 'classnames'

import s from './MMFOrderEntryFormOrder.scss'
import MMFOrderEntryFormAccountInfo from './MMFOrderEntryFormAccountInfo'
import AmountTextField from '../../fields/AmountTextField'
import CommentTextField from '../../fields/CommentTextField'
import OrderCheckboxField from '../../fields/OrderCheckboxField'
import QuantityTypeSelectField from '../../fields/QuantityTypeSelectField'
import OrderSideSelectField from '../../fields/OrderSideSelectField'
import RedemptionTypeField from '../../fields/RedemptionTypeField'
import FormValueSelector from '../../components/FormValueSelector'
import TradeDateField from '../../fields/TradeDateField'
import TradeWindowSelectField from '../../fields/TradeWindowSelectField'
import SettlementDateField from '../../fields/SettlementDateField'
import MMFOrderEntryFormSettlementInstructions from './MMFOrderEntryFormSettlementInstructions'
import { INVESTOR_EXEC_PERMISSION_TYPES } from '../../enums/index'
import MMFOrderEntryFormErrorField from './MMFOrderEntryFormErrorField'

class MMFOrderEntryFormOrder extends PureComponent {
  static propTypes = {
    member: PropTypes.string.isRequired,
    accountType: PropTypes.string.isRequired,
    onOrderSelectionChange: PropTypes.func.isRequired,
    setDefaultSSI: PropTypes.func.isRequired,
    data: PropTypes.shape({
      fund: PropTypes.shape({
        redemptionGate: PropTypes.bool,
        subscriptionGate: PropTypes.bool,
      }),
    }),
  }

  render() {
    const {
      onOrderSelectionChange,
      // values,
      member,
      data,
      accountType,
      setDefaultSSI,
    } = this.props

    const showAppovalMessage =
      data.account.executePermission ===
      INVESTOR_EXEC_PERMISSION_TYPES.REQUIRE_APPROVAL

    return (
      <FormValueSelector name={`${member}.selectedForTrade`}>
        {selectedForTrade => (
          <div className={cx(s.account, { [s.selected]: selectedForTrade })}>
            <div className={s.selector}>
              <OrderCheckboxField
                onChange={onOrderSelectionChange}
                inline
                name="selectedForTrade"
              />
            </div>
            <div>
              <div className={s.accountInfo}>
                <MMFOrderEntryFormAccountInfo member={member} data={data} />
              </div>
              <Field
                name="tradeInputValidationErrors"
                component={MMFOrderEntryFormErrorField}
              />
              <Collapsible collapsed={!selectedForTrade}>
                <div className={s.orderEntry}>
                  {selectedForTrade && (
                    <FormSection name="order">
                      <div className={s.orderRow}>
                        <OrderSideSelectField
                          name="orderSide"
                          redemptionGate={data.fund.redemptionGate}
                          subscriptionGate={data.fund.subscriptionGate}
                          required={selectedForTrade}
                        />
                        <FormValueSelector
                          name={`${member}.order.orderSide.value`}
                        >
                          {orderSide => (
                            <Fragment>
                              {data.fund.redemptionFeeInEffect && (
                                <RedemptionTypeField
                                  name="redemptionType"
                                  supportedRedemptionFeeTypes={
                                    data.fund.supportedRedemptionFeeTypes
                                  }
                                  required={selectedForTrade}
                                  orderSide={orderSide}
                                />
                              )}
                              <QuantityTypeSelectField
                                supportQtyTypes={data.supportedQtyTypes}
                                orderSide={orderSide}
                                required={selectedForTrade}
                                name="quantityType"
                              />
                            </Fragment>
                          )}
                        </FormValueSelector>
                        <AmountTextField
                          name="amount"
                          required={selectedForTrade}
                        />
                        <TradeDateField
                          name="tradeDate"
                          required={selectedForTrade}
                        />
                        {data.fund.supportTradeWindows && (
                          <TradeWindowSelectField
                            name="tradeWindow"
                            tradeWindows={data.tradeWindows}
                            required={selectedForTrade}
                          />
                        )}
                        {data.fund.overrideSettlementDate && (
                          <SettlementDateField
                            name="settlementDate"
                            required={selectedForTrade}
                          />
                        )}
                      </div>
                      <div className={s.orderRow}>
                        <CommentTextField
                          name="comment"
                          label="Comments"
                          maxLength={160}
                        />
                        {showAppovalMessage && (
                          <CommentTextField
                            name="commentToApproval"
                            label="Approval Messages"
                            maxLength={160}
                          />
                        )}
                      </div>
                      <div className={s.orderRow}>
                        <FormValueSelector
                          name={`${member}.order.orderSide.value`}
                        >
                          {orderSide => (
                            <MMFOrderEntryFormSettlementInstructions
                              orderSide={orderSide}
                              required={selectedForTrade}
                              data={data}
                              accountType={accountType}
                              setDefaultSSI={setDefaultSSI}
                            />
                          )}
                        </FormValueSelector>
                      </div>
                    </FormSection>
                  )}
                </div>
              </Collapsible>
            </div>
          </div>
        )}
      </FormValueSelector>
    )
  }
}

export default MMFOrderEntryFormOrder
