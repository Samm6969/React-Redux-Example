import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import momentPropTypes from 'react-moment-proptypes'
import _ from 'lodash'
import { connect } from 'react-redux'

import Input from '../Input'
import DatePickerPortal from './DatePickerPortal'

const mapStateToProps = state => ({
  dateFormat: _.get(state, 'settings.dateFormat.value'),
})
@connect(
  mapStateToProps,
  null,
)
class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, momentPropTypes.momentObj]),
    onBlur: PropTypes.func,
    meta: PropTypes.shape({
      form: PropTypes.string,
    }),
    dateFormat: PropTypes.string,
  }

  /**
   * Fix an issue where redux-forms clears the value on blur
   * https://github.com/erikras/redux-form/issues/82#issuecomment-274047138
   */
  onBlur = e => {
    const { value, onBlur, meta } = this.props
    if (typeof onBlur === 'function') {
      // is a component used by redux-forms
      if (meta.form) {
        onBlur(value, e)
      } else {
        onBlur(e)
      }
    }
  }

  render() {
    const { value, ...rest } = this.props

    return (
      <ReactDatePicker
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        todayButton="Today"
        customInput={<Input type="text" />}
        popperContainer={DatePickerPortal}
        {...rest}
        selected={typeof value === 'string' ? null : value}
        onBlur={this.onBlur}
      />
    )
  }
}

export default DatePicker
