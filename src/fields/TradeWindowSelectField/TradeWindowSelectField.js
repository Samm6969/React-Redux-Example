import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Field } from 'redux-form'

import s from './TradeWindowSelectField.scss'
import TimeFormatter from '../../components/TimeFormatter'
import { SelectField } from '../fields'

class TradeWindowSelectField extends Component {
  static propTypes = {
    tradeWindows: PropTypes.arrayOf(
      PropTypes.shape({
        // id: PropTypes.string,
        tradeWindowsId: PropTypes.number,
        // addedBy: PropTypes.string,
        // cobrandId: PropTypes.number,
        // endTime: PropTypes.string,
        // expectedPriceTime: PropTypes.string,
        // fundId: PropTypes.number,
        // fundTimezoneId: PropTypes.number,
        // fundTimezoneName: PropTypes.string,
        // invAccountId: PropTypes.number,
        // providerTradeWindowRef: PropTypes.string,
        redEndTime: PropTypes.string,
        redemptionSettlementPeriod: PropTypes.number,
        // startTime: PropTypes.string,
        subEndTime: PropTypes.string,
        subscriptionSettlementPeriod: PropTypes.number,
      }),
    ),
  }

  optionDisplay = ({
    label,
    redEndTime,
    subEndTime,
    redemptionSettlementPeriod,
    subscriptionSettlementPeriod,
  }) => {
    if (label) {
      return <strong>{label}</strong>
    }

    return (
      <table className={s.table}>
        <tbody>
          <tr>
            <td className={s.labelCol}>
              <strong>Window Cutoff</strong> (
              <TimeFormatter time={subEndTime} format="z" />)<strong>:</strong>
            </td>
            <td className={s.buyCol}>
              <strong>Buy: </strong>
              <TimeFormatter time={subEndTime} showTimeZone={false} />
            </td>
            <td className={s.sellCol}>
              <strong>Sell: </strong>
              <TimeFormatter time={redEndTime} showTimeZone={false} />
            </td>
          </tr>
          <tr>
            <td className={s.labelCol}>Settlement Period:</td>
            <td
              className={cx(s.buyCol, {
                [s.settlementPeriodWarning]: subscriptionSettlementPeriod > 0,
              })}
            >
              T+
              {subscriptionSettlementPeriod}
            </td>
            <td
              className={cx(s.sellCol, {
                [s.settlementPeriodWarning]: redemptionSettlementPeriod > 0,
              })}
            >
              T+
              {redemptionSettlementPeriod}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  selectWindowDisplay = ({ label, redEndTime, subEndTime }) => {
    if (label) {
      return label
    }

    return (
      <table className={s.table}>
        <tbody>
          <tr>
            <td className={s.buyCol}>
              <strong>Buy: </strong>
              <TimeFormatter time={subEndTime} />
            </td>
            <td className={s.sellCol}>
              <strong>Sell: </strong>
              <TimeFormatter time={redEndTime} />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    const { tradeWindows, ...rest } = this.props

    const options = [
      { id: 0, tradeWindowsId: 0, label: 'Next Available' },
      ...(tradeWindows || []),
    ]

    const styles = {
      container: base => ({
        ...base,
        width: 280,
      }),
      menu: base => ({
        ...base,
        width: 350,
      }),
    }

    return (
      <Field
        {...rest}
        options={options}
        isSearchable={false}
        selectValueDisplay={this.selectWindowDisplay}
        getOptionLabel={this.optionDisplay}
        getOptionValue={({ tradeWindowsId }) => tradeWindowsId}
        label="Trade Window"
        formGroupClassName={s.group}
        styles={styles}
        component={SelectField}
      />
    )
  }
}

export default TradeWindowSelectField
