import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { connect } from 'react-redux'

import s from './TradingWindowsTable.scss'
import TimeFormatter from '../../components/TimeFormatter'

const mapStateToProps = state => ({
  twentyFourHourTime: _.get(state, 'settings.twentyFourHourTime'),
})

@connect(
  mapStateToProps,
  null,
)
class TradingWindowsTable extends Component {
  static propTypes = {
    twentyFourHourTime: PropTypes.bool,
  }

  state = {}

  static getDerivedStateFromProps(props) {
    const { windows } = props
    const accWindows = new Map()
    // console.log(windows)

    _.forEach(windows, tradeWindows => {
      _.forEach(
        tradeWindows,
        ({
          tradeWindowsId,
          fundTimezoneName,
          expectedPriceTime,
          endTime,
          redEndTime,
          subEndTime,
        }) => {
          const accWindow = accWindows.get(tradeWindowsId)
          // console.log(
          //   subEndTime,
          //   moment(subEndTime)
          //     .tz(timeZone)
          //     .format('HH:mm'),
          //   redEndTime,
          //   moment(redEndTime)
          //     .tz(timeZone)
          //     .format('HH:mm'),
          // )
          let nextRedEndTime = redEndTime
          let nextSubEndTime = subEndTime
          if (accWindow) {
            nextRedEndTime = moment.min(
              moment(redEndTime),
              moment(accWindow.redEndTime),
            )
            nextSubEndTime = moment.min(
              moment(subEndTime),
              moment(accWindow.subEndTime),
            )
          }
          accWindows.set(tradeWindowsId, {
            fundTimezoneName,
            tradeWindowsId,
            expectedPriceTime,
            endTime,
            redEndTime: nextRedEndTime,
            subEndTime: nextSubEndTime,
          })
        },
      )
    })
    return {
      windows: Array.from(accWindows.values()),
    }
  }

  render() {
    const { twentyFourHourTime } = this.props
    const { windows } = this.state
    const timeFormat = twentyFourHourTime ? 'HH:mm' : 'hh:mm A'
    return (
      <table className={s.table}>
        <tbody>
          <tr>
            <th>Time Zone</th>
            <th>Strike Time</th>
            <th>Sub Cutoff</th>
            <th>Red Cutoff</th>
            <th>Expected Price Time</th>
          </tr>
          {windows.map(
            ({
              tradeWindowsId,
              expectedPriceTime,
              endTime,
              subEndTime,
              redEndTime,
            }) => (
              <tr key={tradeWindowsId}>
                <td>
                  <TimeFormatter time={expectedPriceTime} format="z" />
                </td>
                <td>
                  <TimeFormatter time={endTime} format={timeFormat} />
                </td>
                <td>
                  <TimeFormatter time={subEndTime} format={timeFormat} />
                </td>
                <td>
                  <TimeFormatter time={redEndTime} format={timeFormat} />
                </td>
                <td>
                  <TimeFormatter time={expectedPriceTime} format={timeFormat} />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    )
  }
}

export default TradingWindowsTable
