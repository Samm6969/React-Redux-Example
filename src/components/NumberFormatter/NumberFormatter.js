import { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'

/**
 * Based on JavaScripts Number.prototype.toLocaleString method
 * The toLocaleString() method returns a string with a language sensitive representation of this number.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleStrings
 */
const mapStateToProps = state => ({
  locales: _.get(state, 'settings.numberFormat.value'),
})
@connect(
  mapStateToProps,
  null,
)
class NumberFormatter extends Component {
  static propTypes = {
    value: PropTypes.node.isRequired,
    locales: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.object,
    formatter: PropTypes.func,
    minimumFractionDigits: PropTypes.number,
    maximumFractionDigits: PropTypes.number,
  }

  static defaultProps = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  render() {
    const {
      value,
      locales,
      options,
      formatter,
      minimumFractionDigits,
      maximumFractionDigits,
    } = this.props
    const localeValue = Number(value).toLocaleString(locales, {
      minimumFractionDigits,
      maximumFractionDigits,
      ...options,
    })
    return typeof formatter === 'function'
      ? formatter(localeValue)
      : localeValue
  }
}

export default NumberFormatter
