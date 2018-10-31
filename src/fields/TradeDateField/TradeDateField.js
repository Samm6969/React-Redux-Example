import React, { Component } from 'react'
import { Field } from 'redux-form'
import moment from 'moment'

import { DatePickerInput } from '../fields'

class TradeDateField extends Component {
  state = {
    selected: moment(),
  }

  onChange = (e, date) => {
    this.setState({ selected: date })
  }

  filterDate = date => moment(date).isSameOrAfter(Date.now(), 'day')

  render() {
    const { ...rest } = this.props
    const { selected } = this.state

    return (
      <Field
        {...rest}
        selected={selected}
        filterDate={this.filterDate}
        label="Trade Date"
        defaultValue={selected}
        onChange={this.onChange}
        component={DatePickerInput}
      />
    )
  }
}

export default TradeDateField
