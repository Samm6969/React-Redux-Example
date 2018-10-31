import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, List, Tooltip } from '@fc/react-playbook'
import cx from 'classnames'

import s from './OrderFundGroup.scss'
import ValueField from '../../components/ValueField'

class OrderFundGroup extends Component {
  static propTypes = {
    fund: PropTypes.shape({
      cusip: PropTypes.string,
      isin: PropTypes.string,
      provider: PropTypes.shape({
        name: PropTypes.string,
      }),
      iso: PropTypes.string,
      subscriptionGate: PropTypes.bool,
      redemptionGate: PropTypes.bool,
      redemptionFeeInEffect: PropTypes.bool,
      currency: PropTypes.shape({
        currencyCode: PropTypes.string,
      }),
      name: PropTypes.string,
    }),
    children: PropTypes.node,
    showFundDetails: PropTypes.bool,
  }

  static defaultProps = {
    showFundDetails: true,
  }

  render() {
    const { fund, children, showFundDetails, ...rest } = this.props
    const {
      cusip,
      isin,
      provider,
      iso,
      subscriptionGate,
      redemptionGate,
      redemptionFeeInEffect,
      currency,
      name,
    } = fund

    const gateMessages = (
      <List noStyle>
        {redemptionGate && <li>Redemption Gate In Effect</li>}
        {subscriptionGate && <li>Purchase Gate In Effect</li>}
      </List>
    )

    return (
      <div className={s.fundGroup} {...rest}>
        <div className={s.fundInfo}>
          <div className={s.fundName}>{`${name} (${provider.name})`}</div>
          {showFundDetails && (
            <div className={s.fundDetails}>
              <ValueField
                inline
                label="Currency"
                value={currency.currencyCode}
              />
              {iso && <ValueField inline label="Fund Number" value={iso} />}
              {cusip && <ValueField inline label="CUSIP" value={cusip} />}
              {isin && <ValueField inline label="ISIN" value={isin} />}
              {redemptionFeeInEffect && (
                <Tooltip content="Redemption Liquidity Fee In Effect">
                  <Icon name="material-warning" className={cx(s.warning)} />
                </Tooltip>
              )}
              {(subscriptionGate || redemptionGate) && (
                <Tooltip content={gateMessages}>
                  <Icon name="material-error" className={cx(s.error)} />
                </Tooltip>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    )
  }
}

export default OrderFundGroup
