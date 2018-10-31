import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import _ from 'lodash'
import { Icon, Tooltip, List } from '@fc/react-playbook'

import s from './NotificationsColumnRenderer.scss'
import EmptyCellRenderer from '../EmptyCellRenderer'

class NotificationsColumnRenderer extends Component {
  static propTypes = {
    record: PropTypes.shape({
      fund: PropTypes.shape({
        earlyCloseOrHoliday: PropTypes.bool,
        fundWholeHoliday: PropTypes.bool,
        redemptionFeeInEffect: PropTypes.bool,
        redemptionGate: PropTypes.bool,
        subscriptionGate: PropTypes.bool,
      }),
    }),
  }

  render() {
    const { record } = this.props
    if (!record) {
      return <EmptyCellRenderer />
    }
    const earlyCloseOrHoliday = _.get(record, 'fund.earlyCloseOrHoliday')
    const fundWholeHoliday = _.get(record, 'fund.fundWholeHoliday')
    const redemptionFeeInEffect = _.get(record, 'fund.redemptionFeeInEffect')
    const redemptionGate = _.get(record, 'fund.redemptionGate')
    const subscriptionGate = _.get(record, 'fund.subscriptionGate')

    const showWarning = earlyCloseOrHoliday || redemptionFeeInEffect
    const showError = fundWholeHoliday || redemptionGate || subscriptionGate

    if (!showWarning && !showError) {
      return <EmptyCellRenderer />
    }

    const warningMessages = (
      <List noStyle>
        {earlyCloseOrHoliday && <li>Early Close</li>}
        {redemptionFeeInEffect && <li>Redemption Liquidity Fee In Effect</li>}
      </List>
    )
    const errorMessages = (
      <List noStyle>
        {fundWholeHoliday && <li>Fund Holiday</li>}
        {redemptionGate && <li>Redemption Gate In Effect</li>}
        {subscriptionGate && <li>Purchase Gate In Effect</li>}
      </List>
    )

    return (
      <Fragment>
        {showWarning && (
          <Tooltip content={warningMessages}>
            <Icon name="material-warning" className={cx(s.warning, s.icon)} />
          </Tooltip>
        )}
        {showError && (
          <Tooltip content={errorMessages}>
            <Icon name="material-error" className={cx(s.error, s.icon)} />
          </Tooltip>
        )}
      </Fragment>
    )
  }
}

export default NotificationsColumnRenderer
