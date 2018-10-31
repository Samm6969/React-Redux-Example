import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

class DatePickerPortal extends Component {
  render() {
    if (typeof document === 'undefined') {
      return null
    }
    return ReactDOM.createPortal(<div {...this.props} />, document.body)
  }
}

export default DatePickerPortal
