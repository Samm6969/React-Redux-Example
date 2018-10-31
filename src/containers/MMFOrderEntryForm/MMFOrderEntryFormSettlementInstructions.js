import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AlertBanner } from '@fc/react-playbook'
import _ from 'lodash'
import CashSettlementInstructionsField from '../../fields/CashSettlementInstructionsField'
// import SettlementInstructionMessages from './MMFOrderEntryFormSettlementInstructionMessages'
import CustodySettlementInstructionsField from '../../fields/CustodySettlementInstructionsField'
// import { ACCOUNT_TYPES } from '../../enums'
import OrderSideType from '../../enums/OrderSideType'

class MMFOrderEntryFormSettlementInstructions extends Component {
  static propTypes = {
    required: PropTypes.bool,
    // accountType: PropTypes.string.isRequired,
    orderSide: PropTypes.string,
    data: PropTypes.shape({
      fund: PropTypes.shape({ autoSettlementModel: PropTypes.string }),
    }),
    setDefaultSSI: PropTypes.func.isRequired,
  }

  get fundSetupForAutoSettle() {
    const { data } = this.props
    const {
      fund: { stableNav, defaultPrice },
    } = data
    const sameDaySettle = data.fund.settlementPeriod === 0

    if (stableNav && sameDaySettle && !_.isEmpty(defaultPrice)) {
      // stable nav, same day settle, must have default price
      return true
    }

    if (stableNav && !sameDaySettle) {
      // stable nav, T+n settle
      return true
    }

    return !stableNav
  }

  get config() {
    const { data, orderSide } = this.props
    const {
      fund: {
        autoSettlementModel,
        fundRoutingAutoSettlementSupported,
        providerSettlementInstructionAssociated,
      },
      cashInstructions,
      custodyInstructions,
      // account: { autoPopulateDefaultSsi },
    } = data
    const { fundSetupForAutoSettle } = this

    const cashInstructionsDefaultValue = _.find(
      cashInstructions || [],
      ({ defaultCurrencySSI }) => defaultCurrencySSI,
    )

    const cashInstructionsNoneValue = _.find(
      cashInstructions || [],
      ({ cashInstructionId }) => cashInstructionId === '-99',
    )

    const custodyInstructionsDefaultValue = _.find(
      custodyInstructions || [],
      ({ defaultCurrencySSI }) => defaultCurrencySSI,
    )

    const custodyInstructionsNoneValue = _.find(
      custodyInstructions || [],
      ({ custodyInstructionId }) => custodyInstructionId === '-99',
    )

    // console.log(cashInstructionsDefaultValue, cashInstructionsNoneValue)

    const config = {
      showCashInstructions: false,
      cashInstructionsDisabled: true,
      showCustodyInstructions: false,
      custodyInstructionsDisabled: true,
      cashInstructionsDefaultValue,
      custodyInstructionsDefaultValue,
      messages: [],
    }

    if (_.isEmpty(autoSettlementModel)) {
      return config
    }

    if (autoSettlementModel === 'PLATFORM') {
      config.showCashInstructions = false
      config.showCustodyInstructions = false
      config.messages.push(
        'Share class requires platform settlement. The settlement must be performed offline.',
      )
    }

    if (autoSettlementModel === 'REGISTERED') {
      if (fundRoutingAutoSettlementSupported) {
        if (fundSetupForAutoSettle) {
          // Cash
          if (!_.isEmpty(cashInstructions)) {
            if (providerSettlementInstructionAssociated) {
              config.showCashInstructions = true
              config.cashInstructionsDisabled = false
            } else {
              config.showCashInstructions = true
              config.cashInstructionsDisabled = false

              if (orderSide !== OrderSideType.SELL) {
                config.showCashInstructions = true
                config.cashInstructionsDisabled = true
                config.messages.push(
                  'Provider Cash SSIs are unavailable. Cash payment must be made offline.',
                )
                config.cashInstructionsDefaultValue = cashInstructionsNoneValue
              }
            }
          } else {
            config.messages.push(
              'Investor account is not configured for cash auto settlement.',
            )
          }

          // Custody
          if (!_.isEmpty(custodyInstructions)) {
            config.showCustodyInstructions = true
            config.custodyInstructionsDisabled = false
          } else {
            config.showCustodyInstructions = false
            config.custodyInstructionsDisabled = true
            config.messages.push(
              'Investor account is not configured for custody auto settlement.',
            )
          }
        } else {
          config.showCashInstructions = false
          config.showCustodyInstructions = false

          // Cash
          if (!_.isEmpty(cashInstructions)) {
            config.showCashInstructions = true
            config.cashInstructionsDisabled = true
            config.cashInstructionsDefaultValue = cashInstructionsNoneValue
          }

          config.messages.push(
            'Fund is not configured for cash automated settlement.',
          )

          // Custody
          if (!_.isEmpty(custodyInstructions)) {
            config.showCustodyInstructions = true
            config.custodyInstructionsDisabled = true
            config.custodyInstructionsDefaultValue = custodyInstructionsNoneValue
          }

          config.messages.push(
            'Fund is not configured for custody automated settlement.',
          )
        }
      } else {
        config.showCashInstructions = false
        config.showCustodyInstructions = false

        // Cash
        if (!_.isEmpty(cashInstructions)) {
          config.showCashInstructions = true
          config.cashInstructionsDisabled = true
          config.cashInstructionsDefaultValue = cashInstructionsNoneValue
        }

        config.messages.push(
          'Cash auto settlement is not supported by Fund Order Routing Type.',
        )

        // Custody
        if (!_.isEmpty(custodyInstructions)) {
          config.showCustodyInstructions = true
          config.custodyInstructionsDisabled = true
          config.custodyInstructionsDefaultValue = custodyInstructionsNoneValue
        }

        config.messages.push(
          'Custody auto settlement is not supported by Fund Order Routing Type.',
        )
      }
    }

    if (!orderSide) {
      config.cashInstructionsDisabled = true
      config.custodyInstructionsDisabled = true
    }

    return config
  }

  render() {
    const { data, required, orderSide, setDefaultSSI } = this.props
    const {
      // fund: { autoSettlementModel, fundRoutingAutoSettlementSupported },
      cashInstructions,
      custodyInstructions,
      fund: { providerSettlementInstructionAssociated },
      // account: { autoPopulateDefaultSsi },
    } = data
    const { config } = this

    // console.log(cashInstructions, custodyInstructions)
    return (
      <div>
        {config.messages.map(message => (
          <AlertBanner
            key={message}
            type="attention"
            message={message}
            show
            inline
          />
        ))}
        <div>
          {config.showCashInstructions && (
            <CashSettlementInstructionsField
              name="cashSettlementInstructions"
              disabled={config.cashInstructionsDisabled}
              required={required}
              cashInstructions={cashInstructions}
              defaultValue={config.cashInstructionsDefaultValue}
              orderSide={orderSide}
              setDefaultSSI={setDefaultSSI}
            />
          )
          // autoPopulateDefaultSsi={autoPopulateDefaultSsi}
          }
        </div>
        <div>
          {config.showCustodyInstructions && (
            <CustodySettlementInstructionsField
              name="custodySettlementInstructions"
              disabled={config.custodyInstructionsDisabled}
              required={required}
              custodyInstructions={custodyInstructions}
              defaultValue={config.custodyInstructionsDefaultValue}
              orderSide={orderSide}
              providerSettlementInstructionAssociated={
                providerSettlementInstructionAssociated
              }
              setDefaultSSI={setDefaultSSI}
            />
          )
          // autoPopulateDefaultSsi={autoPopulateDefaultSsi}
          }
        </div>
      </div>
    )
  }
}

export default MMFOrderEntryFormSettlementInstructions
