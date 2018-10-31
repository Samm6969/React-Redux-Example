import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import s from './MMFOrderEntryFormAccountInfo.scss'
import { getLongAccount } from '../../utils/Stringify'
import { MarketValueColumn, TotalSharesColumn } from '../../columns'
import ValueField from '../../components/ValueField'

class MMFOrderEntryFormAccountInfo extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      account: PropTypes.shape({}),
      balance: PropTypes.shape({
        balanceAmt: PropTypes.number.isRequired,
        shares: PropTypes.number.isRequired,
      }),
    }),
  }

  render() {
    const { data } = this.props
    const { account, balance } = data
    return (
      <Fragment>
        <ValueField
          inline
          label="Account"
          formGroupClassName={s.account}
          value={getLongAccount(account)}
          renderer={({ value }) => <span title={value}>{value}</span>}
        />
        <ValueField
          inline
          label={MarketValueColumn.text}
          formGroupClassName={s.marketValue}
          renderer={({ value }) => (
            <MarketValueColumn.renderer value={value} record={data} />
          )}
          value={balance.balanceAmt}
        />
        <ValueField
          inline
          label={TotalSharesColumn.text}
          formGroupClassName={s.totalShares}
          renderer={({ value }) => (
            <TotalSharesColumn.renderer value={value} record={data} />
          )}
          value={balance.shares}
        />
      </Fragment>
    )
  }
}

export default MMFOrderEntryFormAccountInfo
