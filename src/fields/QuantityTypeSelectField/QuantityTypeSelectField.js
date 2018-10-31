import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Field, untouch as untouchAction, change } from 'redux-form'
import { connect } from 'react-redux'

import withReduxFormContext from '../../hoc/withReduxFormContext'
import { isUndefinedNull } from '../../utils/utils'

import { SelectField } from '../fields'

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
class QuantityTypeSelectField extends Component {
  static propTypes = {
    supportQtyTypes: PropTypes.shape({
      buy: PropTypes.arrayOf(PropTypes.string),
      sell: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    orderSide: PropTypes.string,
    required: PropTypes.bool,
    untouch: PropTypes.func.isRequired,
    setFormValue: PropTypes.func.isRequired,
  }

  state = {
    options: [],
  }

  constructor(props) {
    super(props)
    this.state.orderSide = props.orderSide
  }

  static getDerivedStateFromProps(props, state) {
    const { orderSide, untouch, setFormValue, supportQtyTypes } = props
    const { orderSide: prevOrderSide } = state

    const supportQtyTypesBySide = orderSide
      ? supportQtyTypes[_.toLower(orderSide)]
      : []

    const options = supportQtyTypesBySide.map(option => ({
      value: option,
      label: option,
    }))

    if (orderSide !== prevOrderSide) {
      untouch()
      if (options.length === 1) {
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

    const disabled = !orderSide || options.length === 1

    const validate = []

    if (required && !disabled) {
      validate.push(requiredField)
    }

    const styles = {
      container: base => ({
        ...base,
        width: 150,
      }),
    }

    return (
      <Field
        {...rest}
        options={options}
        disabled={disabled}
        isSearchable={false}
        label="Quantity Type"
        styles={styles}
        component={SelectField}
        validate={validate}
      />
    )
  }
}

export default QuantityTypeSelectField
