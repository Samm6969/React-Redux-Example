import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import { isUndefinedNull } from '../../utils/utils'
import { SelectField } from '../fields'
import OrderSideType from '../../enums/OrderSideType'

const requiredField = value => {
  if (typeof value !== 'object' || isUndefinedNull(value)) {
    return 'This field is required'
  }
  return undefined
}

class OrderSideSelectField extends Component {
  static options = [
    {
      value: OrderSideType.BUY,
      label: 'Buy',
    },
    {
      value: OrderSideType.SELL,
      label: 'Sell',
    },
  ]

  static propTypes = {
    subscriptionGate: PropTypes.bool,
    redemptionGate: PropTypes.bool,
    required: PropTypes.bool,
  }

  render() {
    const { required, subscriptionGate, redemptionGate, ...rest } = this.props

    let { options } = OrderSideSelectField

    if (subscriptionGate && !redemptionGate) {
      options = [OrderSideSelectField.options[1]]
    } else if (!subscriptionGate && redemptionGate) {
      options = [OrderSideSelectField.options[0]]
    }

    const validate = []

    if (required) {
      validate.push(requiredField)
    }

    const styles = {
      container: base => ({
        ...base,
        width: 120,
      }),
    }

    return (
      <Field
        {...rest}
        options={options}
        label="Order Side"
        onBlurResetsInput={false}
        isSearchable={false}
        styles={styles}
        component={SelectField}
        validate={validate}
      />
    )
  }
}

export default OrderSideSelectField
