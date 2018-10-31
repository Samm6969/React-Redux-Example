import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'

import timeZoneOptions from './timeZoneOptions'
import { SelectField, CheckboxField } from '../../fields'

@reduxForm({})
class UserSettingsForm extends Component {
  static numberFormatOptions = [
    { value: 'en-US', label: '1,234,567,890.123 (US-English)' },
    { value: 'de-DE', label: '1.234.567.890,123 (German)' },
    { value: 'fr-FR', label: '1 234 567 890,123 (French)' },
  ]

  static dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'MMM Do YYYY', label: 'MMM Do YYYY' },
  ]

  static propTypes = {
    handleSubmit: PropTypes.func,
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="twentyFourHourTime"
          label="Use 24-hour time"
          type="checkbox"
          inline
          component={CheckboxField}
        />
        <Field
          name="timeZone"
          options={timeZoneOptions}
          label="Time Zone"
          inline
          component={SelectField}
        />
        <Field
          name="dateFormat"
          options={UserSettingsForm.dateFormatOptions}
          label="Date Format"
          inline
          component={SelectField}
        />
        <Field
          name="numberFormat"
          options={UserSettingsForm.numberFormatOptions}
          label="Number Format"
          inline
          component={SelectField}
        />
      </form>
    )
  }
}

export default UserSettingsForm
