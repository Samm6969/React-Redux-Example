import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import { dummyData } from './data'

import { SelectField as SettlementInstr } from '../fields'

class PaymentDetailsInstructionsField extends Component {
  optionLabel = {
    custodianName: 'Beneficiary Bank',
    custodianAccount: 'Beneficiary Account',
    custodianBIC: 'Beneficiary Name',
    cashCutoffTimeDisplay: 'Additional Info',
  }

  static propTypes = {
    name: PropTypes.string,
  }

  createDetailOptions = options => {
    if (!options) return []
    let newAllOptions = []
    _.each(options, item => {
      if (!item.detail) return

      const details = item.detail.map((element, index) =>
        _.assign({}, element, {
          disabled: true,
          id: `detail-${item.id}-${index}`,
          name: `${element.label} : ${element.value}`,
        }),
      )
      newAllOptions.push(item)
      newAllOptions = newAllOptions.concat(details)
    })
    return newAllOptions
  }

  render() {
    const { ...rest } = this.props
    const optionData = this.createDetailOptions(dummyData)
    return (
      <Field
        {...rest}
        label="Payment Instructions"
        options={optionData}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ id }) => id}
        onBlurResetsInput={false}
        isOptionDisabled={option => option.disabled}
        component={SettlementInstr}
      />
    )
  }
}

export default PaymentDetailsInstructionsField
