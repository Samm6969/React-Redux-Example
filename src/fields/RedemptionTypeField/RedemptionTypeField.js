import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, untouch as untouchAction, change } from 'redux-form'
import { connect } from 'react-redux'

import withReduxFormContext from '../../hoc/withReduxFormContext'
import { isUndefinedNull } from '../../utils/utils'

import { SelectField } from '../fields'
import OrderSideType from '../../enums/OrderSideType'

const requiredField = value => {
  if (typeof value !== 'object' || isUndefinedNull(value)) {
    return 'This field is required'
  }
  return undefined
}

const mapDispatchToProps = (dispatch, { section, name }) => ({
  untouch: () =>
    dispatch(untouchAction(section.form, `${section.sectionPrefix}.${name}`)),
  setFormValue: value =>
    dispatch(change(section.form, `${section.sectionPrefix}.${name}`, value)),
})

@withReduxFormContext
@connect(
  null,
  mapDispatchToProps,
)
class RedemptionTypeField extends Component {
  static propTypes = {
    supportedRedemptionFeeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    orderSide: PropTypes.string,
    required: PropTypes.bool,
    untouch: PropTypes.func.isRequired,
    setFormValue: PropTypes.func.isRequired,
  }

  state = {
    orderSide: undefined,
  }

  constructor(props) {
    super(props)
    this.state.orderSide = props.orderSide
  }

  static getDerivedStateFromProps(props, state) {
    const {
      orderSide,
      untouch,
      setFormValue,
      supportedRedemptionFeeTypes,
    } = props
    const { orderSide: prevOrderSide } = state

    const options = supportedRedemptionFeeTypes.map(option => ({
      value: option,
      label: option,
    }))

    if (orderSide !== prevOrderSide) {
      untouch()
      if (options.length === 1 && orderSide === OrderSideType.SELL) {
        setFormValue(options[0])
      } else {
        setFormValue(null)
      }
    }

    return {
      options,
      orderSide,
    }
  }

  render() {
    const { required, ...rest } = this.props
    const { orderSide, options } = this.state

    const disabled =
      !orderSide || orderSide !== OrderSideType.SELL || options.length === 1

    const validate = []

    if (required && !disabled) {
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
        disabled={disabled}
        isSearchable={false}
        label="Redemption Type"
        styles={styles}
        component={SelectField}
        validate={validate}
      />
    )
  }
}

export default RedemptionTypeField
