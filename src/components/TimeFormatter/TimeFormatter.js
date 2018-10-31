import { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

const mapStateToProps = state => ({
  timeZone: _.get(state, 'settings.timeZone.value'),
  twentyFourHourTime: _.get(state, 'settings.twentyFourHourTime'),
})

@connect(
  mapStateToProps,
  null,
)
class TimeFormatter extends Component {
  static propTypes = {
    timeZone: PropTypes.string,
    // twentyFourHourTime: PropTypes.bool,
    // format: PropTypes.string,
    time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
    showTimeZone: PropTypes.bool,
    twentyFourHourTime: PropTypes.bool,
    format: PropTypes.string,
  }

  static defaultProps = {
    showTimeZone: true,
  }

  state = {}

  get format() {
    const { format, twentyFourHourTime, showTimeZone } = this.props
    if (format) {
      return format
    }

    return `${twentyFourHourTime ? 'HH:mm' : 'hh:mm A'} ${
      showTimeZone ? 'z' : ''
    }`
  }

  render() {
    const { time, timeZone } = this.props

    return moment(time)
      .tz(timeZone)
      .format(this.format)
  }
}

export default TimeFormatter
