import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { CheckboxField, SelectField, InputField } from '../../fields'

class AFTOrderEntryFormFundGroup extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      map: PropTypes.func,
      getAll: PropTypes.func,
      get: PropTypes.func,
    }),
    meta: PropTypes.shape({
      error: PropTypes.array,
    }),
    onQtyTypeChange: PropTypes.func,
    onOrderEntrySelect: PropTypes.func,
    accountsList: PropTypes.arrayOf(PropTypes.object),
    sideOptions: PropTypes.arrayOf(PropTypes.object),
    qtyTypeOptions: PropTypes.arrayOf(PropTypes.object),
    currencyUnitsOptions: PropTypes.arrayOf(PropTypes.object),
    currencyCashOptions: PropTypes.arrayOf(PropTypes.object),
  }

  normalizeFieldLength = (value, len) =>
    value.length > len ? undefined : value

  normalizeAmountField = (value, row) => {
    let amountFieldValidation
    if (row.qtyType.value === 'U') {
      amountFieldValidation = {
        reg: /^[0-9]*(?:\.[0-9]{0,4})?$/,
        message: 'Allowed max four decimals',
      }
    } else if (row.qtyType.value === 'C') {
      amountFieldValidation = {
        reg: /^[0-9]*(?:\.[0-9]{0,2})?$/,
        message: 'Allowed max two decimals',
      }
    }
    return amountFieldValidation.reg.test(value)
      ? this.normalizeFieldLength(value, 20)
      : undefined
  }

  render() {
    const isLoading = false
    const {
      fields,
      meta,
      sideOptions,
      qtyTypeOptions,
      currencyUnitsOptions,
      currencyCashOptions,
      ...rest
    } = this.props
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {fields.getAll().length === 0 ? (
            <div>
              <h5>Please add atleast one order entry.</h5>
            </div>
          ) : (
            ''
          )}
        </div>
        {fields.map((member, index) => {
          const row = fields.get(index)
          return (
            <div key={member} style={{ display: 'flex', marginTop: '1rem' }}>
              <div
                style={{
                  flex: 1,
                  order: 1,
                  width: '3%',
                  padding: '6px 0 0 10px',
                }}
              >
                <Field
                  name={`${member}.selected`}
                  type="checkbox"
                  component={CheckboxField}
                  onChange={(event, newValue) =>
                    this.props.onOrderEntrySelect(newValue, index)
                  }
                />
              </div>
              <div style={{ order: 3, width: '20%' }}>
                {this.props.accountsList.length > 0 ? (
                  <Field
                    name={`${member}.accounts`}
                    options={this.props.accountsList}
                    placeholder={isLoading ? 'Loading...' : 'All Accounts'}
                    isLoading={isLoading}
                    isClearable
                    component={SelectField}
                    fieldArrayMetaError={
                      this.props.meta.error &&
                      this.props.meta.error[index] &&
                      this.props.meta.error[index].accounts
                    }
                    disabled={!row.selected}
                  />
                ) : (
                  <Field
                    name={`${member}.accounts`}
                    placeholder="Account"
                    component={InputField}
                    fieldArrayMetaError={
                      this.props.meta.error &&
                      this.props.meta.error[index] &&
                      this.props.meta.error[index].accounts
                    }
                    normalize={value => this.normalizeFieldLength(value, 35)}
                    disabled={!row.selected}
                  />
                )}
              </div>
              <div style={{ order: 3, width: '10%' }}>
                <Field
                  name={`${member}.isin`}
                  placeholder="ISIN"
                  component={InputField}
                  fieldArrayMetaError={
                    this.props.meta.error &&
                    this.props.meta.error[index] &&
                    this.props.meta.error[index].isin
                  }
                  normalize={value => this.normalizeFieldLength(value, 12)}
                  disabled={!row.selected}
                />
              </div>
              <div style={{ order: 3, width: '12%' }}>
                <Field
                  name={`${member}.side`}
                  options={sideOptions}
                  placeholder="Side"
                  isLoading={isLoading}
                  isClearable
                  component={SelectField}
                  fieldArrayMetaError={
                    this.props.meta.error &&
                    this.props.meta.error[index] &&
                    this.props.meta.error[index].side
                  }
                  disabled={!row.selected}
                />
              </div>
              <div style={{ order: 3, width: '8%' }}>
                <Field
                  name={`${member}.qtyType`}
                  {...rest}
                  options={qtyTypeOptions}
                  onChange={this.props.onQtyTypeChange}
                  component={SelectField}
                  fieldArrayMetaError={
                    this.props.meta.error &&
                    this.props.meta.error[index] &&
                    this.props.meta.error[index].qtyType
                  }
                  disabled={!row.selected}
                />
              </div>
              <div style={{ order: 3, width: '14%' }}>
                <Field
                  name={`${member}.amount`}
                  placeholder="Amount"
                  component={InputField}
                  fieldArrayMetaError={
                    this.props.meta.error &&
                    this.props.meta.error[index] &&
                    this.props.meta.error[index].amount
                  }
                  normalize={value => this.normalizeAmountField(value, row)}
                  disabled={!row.selected}
                />
              </div>
              <div style={{ order: 3, width: '10%' }}>
                <Field
                  name={`${member}.currency`}
                  options={
                    fields.get(index).qtyType.value === 'U'
                      ? currencyUnitsOptions
                      : currencyCashOptions
                  }
                  component={SelectField}
                  fieldArrayMetaError={
                    this.props.meta.error &&
                    this.props.meta.error[index] &&
                    this.props.meta.error[index].currency
                  }
                  disabled={!row.selected}
                />
              </div>
              <div style={{ order: 3, width: '23%' }}>
                <Field
                  name={`${member}.clientreference`}
                  placeholder="Client Reference"
                  component={InputField}
                  fieldArrayMetaError={
                    this.props.meta.error &&
                    this.props.meta.error[index] &&
                    this.props.meta.error[index].clientreference
                  }
                  normalize={value => this.normalizeFieldLength(value, 35)}
                  disabled={!row.selected}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default AFTOrderEntryFormFundGroup
