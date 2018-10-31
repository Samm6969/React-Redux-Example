import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment-timezone'
import { Tooltip } from '@fc/react-playbook'

import s from './CutoffColumnRenderer.scss'
import { isUndefinedNull } from '../../utils/utils'
import EmptyCellRenderer from '../EmptyCellRenderer'
import FundHolidayRenderer from '../FundHolidayRenderer'
import TimeFormatter from '../../components/TimeFormatter'

export const SUB_CUTOFF = 'SUB_CUTOFF'
export const RED_CUTOFF = 'RED_CUTOFF'

const CutoffColumnRenderer = ({ type } = {}) => {
  if (isUndefinedNull(type)) {
    throw new Error(
      'CutoffColumnRenderer is a function that requires a type option. It returns a react class. e.g. CutoffColumnRenderer({type: SUB_CUTOFF })',
    )
  }
  return class extends Component {
    static propTypes = {
      value: PropTypes.string,
      record: PropTypes.shape({
        fund: PropTypes.shape({
          fundWholeHoliday: PropTypes.bool.isRequired,
        }),
      }),
    }

    state = {}

    get cutOffTimes() {
      const { subCutOffTimes, redCutOffTimes } = this.state

      switch (type) {
        case SUB_CUTOFF:
          return subCutOffTimes
        case RED_CUTOFF:
          return redCutOffTimes
        default:
          return new Map()
      }
    }

    static getDerivedStateFromProps(props) {
      const { record } = props
      const subCutOffTimes = new Map()
      const redCutOffTimes = new Map()
      const supportTradeWindows = _.get(record, 'fund.supportTradeWindows')

      if (!record || !supportTradeWindows) {
        return {
          supportTradeWindows,
        }
      }

      _.forEach(record.tradeWindows, tradeWindows => {
        _.forEach(
          tradeWindows,
          ({
            subscriptionSettlementPeriod,
            redemptionSettlementPeriod,
            redEndTime,
            subEndTime,
          }) => {
            if (!isUndefinedNull(subscriptionSettlementPeriod)) {
              let nextSubEndTime = subEndTime
              // if (record.fund.name === 'Kevin Jin ST Fund') {
              //   if (subscriptionSettlementPeriod === 0) {
              //     console.log(
              //       moment(subEndTime)
              //         .tz('America/New_York')
              //         .format('HH:mm z'),
              //       subscriptionSettlementPeriod,
              //     )
              //   }
              // }
              const setCutOffTime = subCutOffTimes.get(
                subscriptionSettlementPeriod,
              )

              if (setCutOffTime) {
                nextSubEndTime = moment.max(
                  moment(subEndTime),
                  moment(setCutOffTime),
                )
              }
              subCutOffTimes.set(subscriptionSettlementPeriod, nextSubEndTime)
            }
            if (!isUndefinedNull(redemptionSettlementPeriod)) {
              let nextRedEndTime = redEndTime
              const setCutOffTime = redCutOffTimes.get(
                redemptionSettlementPeriod,
              )

              if (setCutOffTime) {
                nextRedEndTime = moment.max(
                  moment(redEndTime),
                  moment(setCutOffTime),
                )
              }
              redCutOffTimes.set(redemptionSettlementPeriod, nextRedEndTime)
            }
          },
        )
      })

      return {
        subCutOffTimes,
        redCutOffTimes,
        supportTradeWindows,
      }
    }

    formatCutOffTimes = cutOffTimes => {
      if (cutOffTimes.size === 1) {
        let time = ''
        cutOffTimes.forEach(cutOffTime => {
          time = <TimeFormatter time={cutOffTime} />
        })
        return time
      }

      const times = []

      cutOffTimes.forEach((cutOffTime, key) => {
        times.push({
          cutOffTime,
          settlementPeriod: key,
        })
      })

      return (
        <Tooltip
          content={
            <div>
              {times.map(({ cutOffTime, settlementPeriod }) => (
                <div key={settlementPeriod}>
                  <TimeFormatter time={cutOffTime} /> (T+
                  {settlementPeriod})
                </div>
              ))}
            </div>
          }
        >
          <span className={s.link}>Multi</span>
        </Tooltip>
      )
    }

    render() {
      const { value, record } = this.props
      const { supportTradeWindows } = this.state
      const fundWholeHoliday = _.get(record, 'fund.fundWholeHoliday')

      if (fundWholeHoliday) {
        return <FundHolidayRenderer />
      }

      if (supportTradeWindows) {
        return this.formatCutOffTimes(this.cutOffTimes)
      }

      if (isUndefinedNull(value)) {
        return <EmptyCellRenderer />
      }

      return <TimeFormatter time={value} />
    }
  }
}

export default CutoffColumnRenderer
