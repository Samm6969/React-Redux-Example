import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { change, Field, untouch as untouchAction } from 'redux-form'
import { List } from '@fc/react-playbook'
import _ from 'lodash'
import { connect } from 'react-redux'

import { SelectField as SettlementInstr } from '../fields'
import OrderSideType from '../../enums/OrderSideType'
import withReduxFormContext from '../../hoc/withReduxFormContext'
// import MMFOrderEntryFormSettlementInstructionMessages from '../../containers/MMFOrderEntryForm/MMFOrderEntryFormSettlementInstructionMessages'

const custodyInstructionProp = {
  custodianAccount: PropTypes.string,
  custodianBIC: PropTypes.string,
  custodianName: PropTypes.string,
  custodyInstructionId: PropTypes.string,
  defaultCurrencySSI: PropTypes.bool,
  displayName: PropTypes.string,
  includeCashParties: PropTypes.bool,
  custodyBuyMsgType: PropTypes.string,
  id: PropTypes.string,
}

const cashSSISelectionBuyErrorText = ({
  orderSide,
  providerSettlementInstructionAssociated,
}) => value => {
  if (!value || typeof value !== 'object') {
    return null
  }
  const { custodyBuyMsgType, includeCashParties, custodyInstructionId } = value

  if (custodyInstructionId === '-99') {
    return null
  }

  if (
    (_.isEmpty(custodyBuyMsgType) || custodyBuyMsgType === 'NONE') &&
    orderSide === OrderSideType.BUY
  ) {
    return 'The selected Custody SSI record does not support buy settlement messages.'
  }

  if (
    (_.isEmpty(custodyBuyMsgType) || custodyBuyMsgType === 'NONE') &&
    orderSide === OrderSideType.SELL
  ) {
    return 'The selected Custody SSI record does not support sell settlement messages.'
  }

  if (
    orderSide === OrderSideType.BUY &&
    custodyBuyMsgType === 'MT541' &&
    includeCashParties &&
    providerSettlementInstructionAssociated
  ) {
    return 'Provider Cash SSIs are unavailable. Cash payment must be made offline. Remove Custody SSI to place order.'
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
class CustodySettlementInstructionsField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    providerSettlementInstructionAssociated: PropTypes.bool,
    custodyInstructions: PropTypes.arrayOf(
      PropTypes.shape(custodyInstructionProp),
    ),
    defaultValue: PropTypes.shape(custodyInstructionProp),
    section: PropTypes.shape({
      sectionPrefix: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    defaultValue: null,
    custodyInstructions: [],
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
    const { custodyInstructions } = this.props
    return _.find(
      custodyInstructions || [],
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
    custodyInstructionId,
    displayName,
    custodianName,
    custodianAccount,
    custodianBIC,
  }) => {
    if (custodyInstructionId === '-99') {
      return <strong>{displayName}</strong>
    }

    return (
      <Fragment>
        <strong>{displayName}</strong>
        <List noStyle>
          <li>SSI Custodian Name: {custodianName}</li>
          <li>SSI Custodian Account: {custodianAccount}</li>
          <li>SSI Custodian BIC: {custodianBIC}</li>
        </List>
      </Fragment>
    )
  }

  render() {
    const { custodyInstructions, defaultValue, required, ...rest } = this.props

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
        label="Custody Settlement Instructions"
        options={custodyInstructions}
        isSearchable={false}
        getOptionValue={({ id }) => id}
        getOptionLabel={this.optionDisplay}
        selectValueDisplay={this.selectValueDisplay}
        defaultValue={defaultValue}
        styles={styles}
        validate={validate}
        component={SettlementInstr}
        showUntouchedErrors
      />
    )
  }
}

export default CustodySettlementInstructionsField
