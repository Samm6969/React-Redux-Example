import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import _ from 'lodash'

import { InputField as TextField } from '../fields'
import { isUndefinedNull } from '../../utils/utils'

const requiredField = value => {
  if (!value || value === '') {
    return 'This field is required'
  }
  return undefined
}

const mapStateToProps = state => ({
  locales: _.get(state, 'settings.numberFormat.value'),
})
@connect(
  mapStateToProps,
  null,
)
class AmountTextField extends Component {
  static propTypes = {
    locales: PropTypes.string,
    setFormValue: PropTypes.func,
  }

  state = {
    inFocus: false,
  }

  toLocalValue = value => {
    const { locales } = this.props
    return Number(value).toLocaleString(locales, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 20,
    })
  }

  normalize = (rawValue, previousValue) => {
    if (isUndefinedNull(rawValue) || rawValue === '') {
      return rawValue
    }

    const match = rawValue.match(/^(?!m)[0-9]*\.?[0-9]*m?$/g)

    if (match) {
      let value = rawValue
      if (value.match(/^(?!m)[0-9]*\.?[0-9]*m$/g)) {
        value = value.replace(/m/, '')
        value = parseFloat(value)
        value *= 1000000
        value = value.toString()
      }

      return {
        rawValue,
        value,
      }
    }

    return previousValue
  }

  format = value => {
    if (isUndefinedNull(value)) {
      return ''
    }

    const { inFocus } = this.state
    if (!inFocus) {
      return this.toLocalValue(value.value)
    }

    return value.rawValue
  }

  onBlur = () => {
    this.setState({
      inFocus: false,
    })
  }

  onFocus = () => {
    this.setState({
      inFocus: true,
    })
  }

  render() {
    const { required, ...rest } = this.props

    const validate = []

    if (required) {
      validate.push(requiredField)
    }

    return (
      <Field
        {...rest}
        label="Amount"
        align="right"
        type="text"
        component={TextField}
        validate={validate}
        normalize={this.normalize}
        onBlur={this.onBlur}
        format={this.format}
        onFocus={this.onFocus}
      />
    )
  }
}

export default AmountTextField
