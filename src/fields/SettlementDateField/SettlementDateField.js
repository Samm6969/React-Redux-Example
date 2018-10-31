import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { isUndefinedNull } from '../../utils/utils'

import { SelectField } from '../fields'
import SettlementDateType from '../../enums/SettlementDateType'

const requiredField = value => {
  if (typeof value !== 'object' || isUndefinedNull(value)) {
    return 'This field is required'
  }
  return undefined
}

class SettlementDateField extends Component {
  static options = [
    {
      value: SettlementDateType.SAME_DAY,
      label: 'Same Day',
    },
    {
      value: SettlementDateType.NEXT_DAY,
      label: 'Next Day',
    },
  ]

  static propTypes = {
    required: PropTypes.bool,
  }

  render() {
    const { required, ...rest } = this.props
    const validate = []

    if (required) {
      validate.push(requiredField)
    }

    const styles = {
      container: base => ({
        ...base,
        width: 130,
      }),
    }

    return (
      <Field
        {...rest}
        options={SettlementDateField.options}
        isSearchable={false}
        label="Settlement Date"
        styles={styles}
        validate={validate}
        component={SelectField}
      />
    )
  }
}

export default SettlementDateField
