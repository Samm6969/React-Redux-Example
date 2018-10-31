import React, { Component } from 'react'
import { Field } from 'redux-form'

import { CheckboxField } from '../fields'

class OrderCheckboxField extends Component {
  render() {
    const { ...rest } = this.props
    return <Field {...rest} type="checkbox" component={CheckboxField} />
  }
}

export default OrderCheckboxField
