import { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  format: _.get(state, 'settings.dateFormat.value'),
})
@connect(
  mapStateToProps,
  null,
)
class DateFormatter extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]).isRequired,
    format: PropTypes.string,
    inputFormat: PropTypes.string,
  }

  render() {
    const { value, format, inputFormat } = this.props
    return moment(value, inputFormat).format(format)
  }
}

export default DateFormatter
