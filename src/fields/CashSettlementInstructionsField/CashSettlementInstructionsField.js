import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { change, Field, untouch as untouchAction } from 'redux-form'
import { List } from '@fc/react-playbook'
import { connect } from 'react-redux'

import { SelectField as SettlementInstr } from '../fields'
import OrderSideType from '../../enums/OrderSideType'
import withReduxFormContext from '../../hoc/withReduxFormContext'

const cashInstructionProp = {
  cashCutoffTimeDisplay: PropTypes.string,
  cashInstructionId: PropTypes.string,
  custodianAccount: PropTypes.string,
  custodianBIC: PropTypes.string,
  custodianName: PropTypes.string,
  defaultCurrencySSI: PropTypes.bool,
  displayName: PropTypes.string,
  id: PropTypes.string,
  cashBuyMsgType: PropTypes.string,
}

const cashSSISelectionBuyErrorText = ({ orderSide }) => value => {
  if (!value || typeof value !== 'object') {
    return null
  }

  const { cashBuyMsgType, cashInstructionId } = value

  if (cashInstructionId === '-99') {
    return null
  }

  if (
    (_.isEmpty(cashBuyMsgType) || cashBuyMsgType === 'NONE') &&
    orderSide === OrderSideType.BUY
  ) {
    return 'The selected Cash SSI record does not support buy settlement messages.'
  }
  return null
}

const cashSSISelectionSellWarningText = ({ orderSide }) => value => {
  if (!value || typeof value !== 'object') {
    return null
  }

  const { cashBuyMsgType, cashInstructionId } = value

  if (cashInstructionId === '-99') {
    return null
  }

  if (
    (_.isEmpty(cashBuyMsgType) || cashBuyMsgType === 'NONE') &&
    orderSide === OrderSideType.SELL
  ) {
    return 'Warning: The selected Cash SSI record does not support sell settlement messages. No Cash receipt message will be generated.'
  }
  return null
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
class CashSettlementInstructionsField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    cashInstructions: PropTypes.arrayOf(PropTypes.shape(cashInstructionProp)),
    defaultValue: PropTypes.shape(cashInstructionProp),
    section: PropTypes.shape({
      sectionPrefix: PropTypes.string.isRequired,
    }),
    setDefaultSSI: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultValue: null,
    cashInstructions: [],
  }

  constructor(props) {
    super(props)
    this.state.orderSide = props.orderSide
  }

  state = {}

  static getDerivedStateFromProps(props, state) {
    const { orderSide, untouch, setFormValue, defaultValue } = props
    const { orderSide: prevOrderSide } = state

    // Reset field on orderSide change
    if (orderSide !== prevOrderSide) {
      untouch()
      setFormValue(defaultValue)
    }

    return {
      orderSide,
    }
  }

  componentDidMount() {
    this.updateDefaultSSI(true)
  }

  componentDidUpdate() {
    this.updateDefaultSSI(true)
  }

  componentWillUnmount() {
    this.updateDefaultSSI()
  }

  get field() {
    const { section, name } = this.props
    return `${section.sectionPrefix}.${name}`
  }

  get defaultSSI() {
    const { cashInstructions } = this.props
    return _.find(
      cashInstructions || [],
      ({ defaultCurrencySSI }) => defaultCurrencySSI,
    )
  }

  updateDefaultSSI = add => {
    const { setDefaultSSI, disabled } = this.props

    const { field, defaultSSI } = this

    if (!disabled && add) {
      setDefaultSSI(add, field, defaultSSI)
    } else {
      setDefaultSSI(false, field, defaultSSI)
    }
  }

  selectValueDisplay = ({ displayName }) => displayName

  optionDisplay = ({
    cashInstructionId,
    displayName,
    custodianName,
    custodianAccount,
    custodianBIC,
    cashCutoffTimeDisplay,
  }) => {
    if (cashInstructionId === '-99') {
      return <strong>{displayName}</strong>
    }

    return (
      <Fragment>
        <strong>{displayName}</strong>
        <List noStyle>
          <li>SSI Custodian Name: {custodianName}</li>
          <li>SSI Custodian Account: {custodianAccount}</li>
          <li>SSI Custodian BIC: {custodianBIC}</li>
          <li>Cash Cutoff Time: {cashCutoffTimeDisplay}</li>
        </List>
      </Fragment>
    )
  }

  render() {
    const { cashInstructions, defaultValue, required, ...rest } = this.props

    const styles = {
      container: base => ({
        ...base,
        width: 550,
      }),
      menu: base => ({
        ...base,
        width: 550,
      }),
    }

    const validate = []

    if (required) {
      validate.push(cashSSISelectionBuyErrorText(this.props))
    }

    return (
      <Field
        {...rest}
        label="Cash Settlement Instructions"
        options={cashInstructions}
        isSearchable={false}
        getOptionValue={({ id }) => id}
        getOptionLabel={this.optionDisplay}
        selectValueDisplay={this.selectValueDisplay}
        defaultValue={defaultValue}
        styles={styles}
        validate={validate}
        warn={[cashSSISelectionSellWarningText(this.props)]}
        component={SettlementInstr}
        showUntouchedWarnings
        showUntouchedErrors
      />
    )
  }
}

export default CashSettlementInstructionsField
