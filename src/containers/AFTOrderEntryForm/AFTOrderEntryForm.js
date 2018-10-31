import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  LoadingIndicator,
  Snackbar,
  AlertBanner,
  DescriptionList,
  DescriptionListItem,
  Button,
} from '@fc/react-playbook'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import _ from 'lodash'
import { connect } from 'react-redux'
import {
  change,
  Field,
  FieldArray,
  formValueSelector,
  reduxForm,
  reset,
} from 'redux-form'
import s from './AFTOrderEntryForm.scss'
import AFTOrderEntryFormFundGroup from './AFTOrderEntryFormFundGroup'
import { CheckboxField } from '../../fields'
import withQuery from '../../hoc/withQuery'
import AFTOrderEntryFileUpload from './AFTOrderEntryFileUpload'
import FormFieldNames from './FormFieldNames'

const formAFTOrderEntry = formValueSelector('AFTOrderEntry')

const pages = {
  AFT_ORDER_ENTRY: 'AFT_ORDER_ENTRY',
  AFT_ORDER_CONFIRMATION: 'AFT_ORDER_CONFIRMATION',
  AFT_FILE_UPLOAD: 'AFT_FILE_UPLOAD',
}

const query = gql`
  query ATFOrderEntryFormQuery {
    viewer {
      aftAccountNumbers
    }
    currencies {
      id
      currencyId
      currencyCode
      name
    }
  }
`
const EnterAftOrders = gql`
  mutation EnterAftOrders($input: AftOrderRequestsInput!) {
    enterAftOrders(input: $input) {
      id
      orderResponses {
        id
        orderRequest {
          id
          accountNumber
          isin
          side
          quantityType
          amount
          currency
        }
        tradeInputValidationErrors {
          errorCode
          errorText
        }
        tradeBusinessRulesValidationErrors {
          errorCode
          errorLevel
          errorMessage
        }
      }
    }
  }
`
const confirmAftOrdersMutation = gql`
  mutation confirmAftOrders($input: AftOrderRequestsInput!) {
    confirmAftOrders(input: $input) {
      id
      orderResponses {
        id
        orderRequest {
          id
          accountNumber
          isin
          side
          quantityType
          amount
          currency
        }
        orderId
        orderStatus
        tradeInputValidationErrors {
          errorCode
          errorText
        }
        tradeBusinessRulesValidationErrors {
          errorCode
          errorLevel
          errorMessage
        }
      }
    }
  }
`

function mapStateToProps(state) {
  const orderEntries = [
    {
      selected: false,
      qtyType: { value: 'U', label: 'Units' },
      currency: { value: 'FCCY', label: 'Fund CCY' },
    },
    {
      selected: false,
      qtyType: { value: 'U', label: 'Units' },
      currency: { value: 'FCCY', label: 'Fund CCY' },
    },
    {
      selected: false,
      qtyType: { value: 'U', label: 'Units' },
      currency: { value: 'FCCY', label: 'Fund CCY' },
    },
    {
      selected: false,
      qtyType: { value: 'U', label: 'Units' },
      currency: { value: 'FCCY', label: 'Fund CCY' },
    },
    {
      selected: false,
      qtyType: { value: 'U', label: 'Units' },
      currency: { value: 'FCCY', label: 'Fund CCY' },
    },
  ]
  const confirmOrderEntries = []
  const selectAll = false
  const initialValues = {
    selectAll,
    orderEntries,
    confirmOrderEntries,
  }
  return {
    initialValues,
    selectAll: formAFTOrderEntry(state, 'selectAll'),
    orderEntries: formAFTOrderEntry(state, 'orderEntries'),
    confirmOrderEntries: formAFTOrderEntry(state, 'confirmOrderEntries'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // onSubmit(values) {},
    updateOrderEntriesState(key, val) {
      dispatch(change('AFTOrderEntry', key, val))
    },
    resetForm() {
      dispatch(reset('AFTOrderEntry'))
    },
  }
}
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@reduxForm({
  form: 'AFTOrderEntry',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})
@withQuery({
  query,
})
class AFTOrderEntryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    resetForm: PropTypes.func,
    isLoading: PropTypes.bool,
    destroy: PropTypes.func,
    submitting: PropTypes.bool,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }),
    title: PropTypes.string,
    updateOrderEntriesState: PropTypes.func,
    viewer: PropTypes.shape({
      aftAccountNumbers: PropTypes.arrayOf(PropTypes.string),
    }),
    orderEntries: PropTypes.arrayOf(PropTypes.object),
    confirmOrderEntries: PropTypes.arrayOf(PropTypes.object),
    untouch: PropTypes.func,
  }

  state = {
    page: pages.AFT_ORDER_ENTRY,
    orderEntries: [],
    noOfSelectedOrders: 0,
    noOfConfirmSelectedOrders: 0,
    noOfValidConfirmSelectedOrders: 0,
    allowClearForm: false,
    selectAll: false,
    accounts: [],
    sideOptions: [
      { value: 'S', label: 'Subscription' },
      { value: 'R', label: 'Redemption' },
    ],
    qtyTypeOptions: [
      { value: 'U', label: 'Units' },
      { value: 'C', label: 'Cash' },
    ],
    currencyUnitsOptions: [
      { value: 'FCCY', label: 'Fund CCY' },
      { value: 'EUR', label: 'EUR' },
    ],
    currencyCashOptions: [],
  }

  componentWillUnmount() {
    this.props.destroy()
    console.log(
      '~~~~~~~~~~~~AFTOrderEntryForm componentWillUnmount do some thing with state',
    )
  }

  static getDerivedStateFromProps(props, state) {
    let accounts = state.accounts.length === 0 ? [] : state.accounts
    let currencyCashOptions =
      state.currencyCashOptions.length === 0 ? [] : state.currencyCashOptions
    let orderEntriesRef = state.orderEntries
    const confirmOrderEntriesRef = props.confirmOrderEntries
    if (
      props.viewer &&
      props.viewer.aftAccountNumbers &&
      props.viewer.aftAccountNumbers.length > 0
    ) {
      accounts = props.viewer.aftAccountNumbers.map(entity => ({
        value: entity,
        label: entity,
      }))
    }
    if (props.currencies) {
      currencyCashOptions = props.currencies.map(entity => ({
        value: entity.currencyCode,
        label: entity.currencyCode,
      }))
    }
    if (orderEntriesRef.length === 0) {
      orderEntriesRef = props.initialValues.orderEntries
    }

    const noOfSelectedOrdersRef = props.orderEntries
      ? props.orderEntries.filter(order => order.selected).length
      : 0

    let { message, snackbar } = state
    if (state.page === pages.AFT_ORDER_ENTRY) {
      message = undefined
      snackbar = undefined
    }
    let allowClearFormRef = false
    if (props.orderEntries) {
      allowClearFormRef = props.orderEntries.length === 0
    }
    return {
      orderEntries: orderEntriesRef,
      confirmOrderEntries: confirmOrderEntriesRef,
      accounts,
      currencyCashOptions,
      noOfSelectedOrders: noOfSelectedOrdersRef,
      // comment out disable clearForm
      allowClearForm: allowClearFormRef,
      message,
      snackbar,
    }
  }

  onSelectAllFieldChange = (event, newValue) => {
    const { orderEntries, confirmOrderEntries } = this.props
    if (this.state.page === pages.AFT_ORDER_CONFIRMATION) {
      _.forEach(confirmOrderEntries, (item, index) => {
        confirmOrderEntries[index].confirmSelected = newValue
      })
      const noOfConfirmSelectedOrdersRef = confirmOrderEntries.filter(
        order => order.confirmSelected,
      ).length
      this.setState({
        noOfConfirmSelectedOrders: noOfConfirmSelectedOrdersRef,
      })
      this.props.updateOrderEntriesState(
        'confirmOrderEntries',
        confirmOrderEntries,
      )
    } else {
      for (let i = 0; i < orderEntries.length; i++) {
        this.props.updateOrderEntriesState(
          `orderEntries[${i}].selected`,
          newValue,
        )
      }
    }
  }

  addNewOrderEntry = () => {
    const { orderEntries } = this.props
    const { selectAll } = this.state
    orderEntries.push({
      selected: selectAll,
      qtyType: { value: 'U', label: 'Units' },
      currency: { value: 'FCCY', label: 'Fund CCY' },
    })
    this.props.updateOrderEntriesState('orderEntries', orderEntries)
    this.props.updateOrderEntriesState('selectAll', false)
    // comment out disable clearForm
    this.setState({ allowClearForm: orderEntries.length === 0 })
  }

  removeSelectedOrderEntry = () => {
    const { orderEntries } = this.props
    _.remove(orderEntries, item => item.selected)
    this.props.updateOrderEntriesState('orderEntries', orderEntries)
    this.props.updateOrderEntriesState('selectAll', false)
    const noOfSelectedOrdersRef = orderEntries.filter(order => order.selected)
      .length
    this.setState({
      orderEntries,
      noOfSelectedOrders: noOfSelectedOrdersRef,
    })
    console.log(
      '~~~~~~~~~~~~~~ removeSelectedOrderEntry ',
      this.state.orderEntries,
      this.props.orderEntries,
    )
  }

  removeSelectedConfirmOrderEntries = () => {
    const { confirmOrderEntries } = this.props
    _.remove(confirmOrderEntries, item => item.confirmSelected)
    let noOfValidConfirmSelectedOrders = 0
    const noOfConfirmSelectedOrdersRef = confirmOrderEntries.filter(order => {
      if (order.tradeInputValidationErrors.length > 0) {
        noOfValidConfirmSelectedOrders += 1
      }
      return order.confirmSelected
    }).length
    if (confirmOrderEntries.length === 0) {
      this.returnToOrderEntry()
    }
    this.props.updateOrderEntriesState(
      'confirmOrderEntries',
      confirmOrderEntries,
    )
    this.setState({
      orderEntries: confirmOrderEntries,
      noOfConfirmSelectedOrders: noOfConfirmSelectedOrdersRef,
      noOfValidConfirmSelectedOrders,
    })
  }

  // eslint-disable-next-line no-unused-vars
  setCurrencyByQtyType = (qtyTypeValue, selectedRowIndex) => {
    const { orderEntries } = this.props
    orderEntries[selectedRowIndex].currency = undefined
    delete orderEntries[selectedRowIndex].amount
    this.props.updateOrderEntriesState('orderEntries', orderEntries)
  }

  // eslint-disable-next-line no-unused-vars
  onQtyTypeChange = (event, newValue, previousValue, name) => {
    const selectedRowIndex = parseInt(name.match(/\d+/)[0], 10)

    this.setCurrencyByQtyType(newValue, selectedRowIndex)
  }

  getQueryInputForOrderEntries = (orderEntires, isSelectRequired) => {
    let response = []
    if (isSelectRequired) {
      response = orderEntires.filter(order => order.selected).map(order => ({
        accountNumber: order.accounts.value || order.accounts,
        isin: order.isin,
        side: order.side.value,
        quantityType: order.qtyType.value,
        currency: order.currency.value,
        amount: order.amount,
        clientReferenceNumber: order.clientreference || '',
      }))
    } else {
      _.forEach(orderEntires, order => {
        response.push({
          accountNumber: order.accounts
            ? order.accounts.value || order.accounts
            : undefined,
          isin: order.isin,
          side: order.side ? order.side.value : undefined,
          quantityType: order.qtyType ? order.qtyType.value : undefined,
          currency: order.currency ? order.currency.value : undefined,
          amount: order.amount,
          clientReferenceNumber: order.clientreference || '',
        })
      })
    }
    console.log(
      '~~~~ getQueryInputForOrderEntries ',
      orderEntires,
      isSelectRequired,
      response,
    )
    return response
  }

  onSubmit = commitMutation => async values => {
    let filteredOrderEntries = this.getQueryInputForOrderEntries(
      values.orderEntries,
      true,
    )
    const input = {
      aftOrderRequests: filteredOrderEntries,
    }
    const { data } = await commitMutation({
      variables: {
        input,
      },
    })
    let noOfValidConfirmSelectedOrders = 0
    const {
      enterAftOrders: { orderResponses },
    } = data
    filteredOrderEntries = values.orderEntries
      .filter(order => order.selected)
      .map((order, i) => {
        if (orderResponses[i].tradeInputValidationErrors.length > 0) {
          noOfValidConfirmSelectedOrders += 1
        }
        return {
          ...order,
          tradeInputValidationErrors: orderResponses
            ? orderResponses[i].tradeInputValidationErrors
            : false,
          tradeBusinessRulesValidationErrors: orderResponses
            ? orderResponses[i].tradeBusinessRulesValidationErrors
            : false,
        }
      })

    this.setState({
      page: pages.AFT_ORDER_CONFIRMATION,
      orderEntries: filteredOrderEntries,
      noOfValidConfirmSelectedOrders,
    })
    this.props.updateOrderEntriesState(
      'confirmOrderEntries',
      filteredOrderEntries,
    )
    this.props.updateOrderEntriesState('selectAll', false)
  }

  onOrderEntitySelect = (newValue, rowIndex) => {
    const { orderEntries } = this.props
    let noOfSelectedOrdersRef = orderEntries
      ? orderEntries.filter(order => order.selected).length
      : 0
    if (newValue) {
      noOfSelectedOrdersRef += 1
    } else {
      noOfSelectedOrdersRef -= 1
    }
    const selectAllStatus =
      (orderEntries ? orderEntries.length : 0) === noOfSelectedOrdersRef
    if (newValue) {
      const fields = Object.keys(FormFieldNames).map(
        field => `orderEntries[${rowIndex}].${field}`,
      )
      console.error(newValue, fields, rowIndex)
      this.props.untouch(...fields)
    }
    this.props.updateOrderEntriesState('selectAll', selectAllStatus)
  }

  returnToOrderEntry = () => {
    const { orderEntries } = this.props
    const noOfSelectedOrdersRef = orderEntries
      ? orderEntries.filter(order => order.selected).length
      : 0
    const selectAllStatus =
      (orderEntries ? orderEntries.length : 0) === noOfSelectedOrdersRef
    this.props.updateOrderEntriesState('selectAll', selectAllStatus)
    this.setState({
      page: pages.AFT_ORDER_ENTRY,
      noOfConfirmSelectedOrders: 0,
    })
  }

  goToConfirmation = () => {
    this.setState({
      page: pages.AFT_ORDER_CONFIRMATION,
    })
  }

  onEnterAftOrdersError = e => {
    // eslint-disable-next-line no-console
    console.error(e)
  }

  onOrderConfirmMutationComplete = response => {
    const {
      confirmAftOrders: { orderResponses },
    } = response

    const submittedOrders = orderResponses
      // .filter(order => order.orderStatus !== 'rejected')
      .map(order => order.orderId)
      .join(',')
    this.setState({
      snackbar: 'success',
      message: `Orders (${submittedOrders}) has been created successfully`,
    })
  }

  onOrderConfirmMutationError = e => {
    // eslint-disable-next-line no-console
    console.error(e)
  }

  clearForm = () => {
    this.props.resetForm()
  }

  onConfirmChanged = (newValue, index) => {
    console.error(`onConfirmChanged`, newValue, index)
    const { confirmOrderEntries } = this.props
    confirmOrderEntries[index].confirmSelected = newValue
    const noOfConfirmSelectedOrdersRef = confirmOrderEntries.filter(
      order => order.confirmSelected,
    ).length
    const selectAllStatus =
      (confirmOrderEntries ? confirmOrderEntries.length : 0) ===
      noOfConfirmSelectedOrdersRef
    this.props.updateOrderEntriesState('selectAll', selectAllStatus)
    this.props.updateOrderEntriesState(
      'confirmOrderEntries',
      confirmOrderEntries,
    )
    this.setState({
      orderEntries: confirmOrderEntries,
      noOfConfirmSelectedOrders: noOfConfirmSelectedOrdersRef,
    })
  }

  handlePageNav = nextPage => {
    this.setState({
      page: nextPage,
    })
  }

  confirmUploadedOrderEntries = response => {
    console.log('**** confirmUploadedOrderEntries ', response)
    const {
      sideOptions,
      qtyTypeOptions,
      currencyUnitsOptions,
      currencyCashOptions,
    } = this.state
    let noOfValidConfirmSelectedOrders = 0
    const confirmOrderRequest = response.uploadAftOrders.orderResponses.map(
      order => {
        const uploadOrder = order.orderRequest
        uploadOrder.accounts = order.orderRequest.accountNumber
        uploadOrder.side = _.find(
          sideOptions,
          o => o.value === order.orderRequest.side,
        )
        uploadOrder.qtyType = _.find(
          qtyTypeOptions,
          o => o.value === order.orderRequest.quantityType,
        )
        if (order.orderRequest.quantityType === 'U') {
          uploadOrder.currency = _.find(
            currencyUnitsOptions,
            o => o.value === order.orderRequest.currency,
          )
        } else {
          uploadOrder.currency = _.find(
            currencyCashOptions,
            o => o.value === order.orderRequest.currency,
          )
        }
        uploadOrder.confirmSelected = false
        uploadOrder.tradeInputValidationErrors =
          order.tradeInputValidationErrors
        uploadOrder.tradeBusinessRulesValidationErrors =
          order.tradeBusinessRulesValidationErrors
        if (order.tradeInputValidationErrors.length > 0) {
          noOfValidConfirmSelectedOrders += 1
        }
        return uploadOrder
      },
    )
    console.log(
      '~~~~~~ confirmOrderRequest ',
      confirmOrderRequest,
      noOfValidConfirmSelectedOrders,
    )
    this.setState({
      orderEntries: confirmOrderRequest,
      noOfValidConfirmSelectedOrders,
      page: pages.AFT_ORDER_CONFIRMATION,
    })
    this.props.updateOrderEntriesState(
      'confirmOrderEntries',
      confirmOrderRequest,
    )
    // this.handlePageNav(pages.AFT_ORDER_CONFIRMATION)
    // this.props.updateOrderEntriesState('orderEntries', confirmOrderRequest)
    // this.setState({ accounts: [] })
  }

  renderConfirmOrderEntry = (orderEntry, index) => {
    let currency = ''
    if (orderEntry.currency && orderEntry.currency.label) {
      currency = orderEntry.currency.label
    }
    return (
      <div key={index}>
        {orderEntry.tradeInputValidationErrors.length > 0 ? (
          <AlertBanner
            className={s.banner}
            type="warning"
            message={
              <DescriptionList>
                {orderEntry.tradeInputValidationErrors.map((error, term) => (
                  <DescriptionListItem key={error.errorText} term={term}>
                    {error.errorText}
                  </DescriptionListItem>
                ))}
              </DescriptionList>
            }
            show
            inline
          />
        ) : (
          ''
        )}

        {orderEntry.tradeBusinessRulesValidationErrors.length > 0 ? (
          <AlertBanner
            className={s.banner}
            type="attention"
            message={
              <DescriptionList>
                {orderEntry.tradeBusinessRulesValidationErrors.map(
                  (error, term) => (
                    <DescriptionListItem key={error.errorMessage} term={term}>
                      {error.errorMessage}
                    </DescriptionListItem>
                  ),
                )}
              </DescriptionList>
            }
            show
            inline
          />
        ) : (
          ''
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'auto',
            overflowY: 'auto',
          }}
          key={orderEntry.id}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: '#b3b3b32b',
              marginBottom: '15px',
              paddingTop: '12px',
            }}
          >
            <div
              style={{ flex: 1, order: 1, width: '3%', padding: '0 0 0 10px' }}
            >
              <Field
                name={`confirmOrderEntries[${index}].confirmSelected`}
                type="checkbox"
                component={CheckboxField}
                onChange={(event, newValue) =>
                  this.onConfirmChanged(newValue, index)
                }
              />
            </div>
            <div style={{ order: 2, width: '20%' }}>
              {orderEntry.accounts
                ? orderEntry.accounts.label || orderEntry.accounts
                : undefined}
            </div>
            <div style={{ order: 3, width: '10%' }}>{orderEntry.isin}</div>
            <div style={{ order: 3, width: '12%' }}>
              {orderEntry.side
                ? orderEntry.side.label || orderEntry.side
                : undefined}
            </div>
            <div style={{ order: 3, width: '8%' }}>
              {orderEntry.qtyType
                ? orderEntry.qtyType.label || orderEntry.qtyType
                : undefined}
            </div>
            <div style={{ order: 3, width: '14%' }}>{orderEntry.amount}</div>
            <div style={{ order: 3, width: '10%' }}>{currency}</div>
            <div style={{ order: 3, width: '23%' }}>
              {orderEntry.clientreference || ''}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderHeader = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // overflowX: 'auto',
        // overflowY: 'auto',
        height: '30px',
        borderBottom: 'solid 1px black',
        marginBottom: '10px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, order: 1, width: '3%', padding: '0 0 0 10px' }}>
          <Field
            name="selectAll"
            type="checkbox"
            onChange={this.onSelectAllFieldChange}
            value={this.state.selectAll}
            component={CheckboxField}
          />
        </div>
        <div className={s.heading} style={{ order: 2, width: '20%' }}>
          Account Number
        </div>
        <div className={s.heading} style={{ order: 3, width: '10%' }}>
          ISIN
        </div>
        <div className={s.heading} style={{ order: 3, width: '12%' }}>
          Side
        </div>
        <div className={s.heading} style={{ order: 3, width: '8%' }}>
          Qty Type
        </div>
        <div className={s.heading} style={{ order: 3, width: '14%' }}>
          Amount
        </div>
        <div className={s.heading} style={{ order: 3, width: '10%' }}>
          Currency
        </div>
        <div className={s.heading} style={{ order: 3, width: '23%' }}>
          Client Reference
        </div>
      </div>
    </div>
  )

  validateOrderEntityRow = values => {
    const errors = []
    _.forEach(values, row => {
      let validationEntries = null
      if (row.selected) {
        validationEntries = {}
        if (!row.accounts) {
          validationEntries.accounts = 'Required'
        } else if (!row.accounts.value) {
          const reg = /^[a-zA-Z0-9/-?-:().,'+]*[A-Za-z0-9/-?-:().,'+]+$/
          if (!reg.test(row.accounts)) {
            validationEntries.accounts =
              'Can only contain UPPER and lower case Roman Alphabet, numbers 0-9 and punctuation marks /-?:().,+'
          }
        }
        if (!row.isin) {
          validationEntries.isin = 'Required'
        } else if (row.isin.length !== 12) {
          validationEntries.isin =
            'ISIN must be 12 alphanumeric characters; first 2 must be letters; last must be a number.'
        } else {
          const reg = /^[a-zA-Z]{2}[A-Za-z0-9]*[0-9]+$/
          if (!row.isin) {
            validationEntries.isin = 'Required'
          } else if (!reg.test(row.isin)) {
            validationEntries.isin =
              'ISIN must be 12 alphanumeric characters; first 2 must be letters; last must be a number.'
          }
        }
        if (!row.side) {
          validationEntries.side = 'Required'
        }
        if (!row.qtyType) {
          validationEntries.qtyType = 'Required'
        }
        if (!row.currency) {
          validationEntries.currency = 'Required'
        }
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

        if (!row.amount) {
          validationEntries.amount = 'Required'
        } else if (row.amount < 0) {
          validationEntries.amount = 'Must be a positive number'
        } else if (!amountFieldValidation.reg.test(row.amount)) {
          validationEntries.amount = amountFieldValidation.message
        }
        // TODO: Remove message, its optional
        const clientreferenceReg = /^[a-zA-Z0-9/-?-:().,'+]*[A-Za-z0-9/-?-:().,'+]+$/
        if (!clientreferenceReg.test(row.clientreference)) {
          validationEntries.clientreference =
            'Can only contain UPPER and lower case Roman Alphabet, numbers 0-9 and punctuation marks /-?:().,+'
        }
        if (_.keys(validationEntries).length === 0) {
          validationEntries = null
        }
      }
      errors.push(validationEntries)
    })
    let valid = true
    _.forEach(errors, item => {
      if (item) {
        valid = false
      }
    })
    console.log('~~~~~~~~~~~~~~~ Validation error ', valid, errors)
    return valid ? undefined : errors
  }

  render() {
    const { handleSubmit, title, isLoading, submitting } = this.props
    const {
      page,
      orderEntries,
      sideOptions,
      qtyTypeOptions,
      currencyUnitsOptions,
      currencyCashOptions,
      accounts,
    } = this.state
    return (
      <Mutation mutation={EnterAftOrders} onError={this.onEnterAftOrdersError}>
        {(commitOrderEntryFormMutation, { loading: mutationLoading }) => {
          // eslint-disable-next-line no-unused-vars
          const loading = isLoading || submitting || mutationLoading
          const confirmMutation = this.onSubmit(commitOrderEntryFormMutation)
          return (
            <form
              onSubmit={handleSubmit(confirmMutation)}
              style={{ width: '100%' }}
            >
              {page === pages.AFT_ORDER_ENTRY && (
                <Card className={s.card}>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent style={{ height: '60vh' }}>
                    {loading && <LoadingIndicator />}
                    {!loading && (
                      <div>
                        {this.renderHeader()}
                        <FieldArray
                          name="orderEntries"
                          component={AFTOrderEntryFormFundGroup}
                          sideOptions={sideOptions}
                          qtyTypeOptions={qtyTypeOptions}
                          currencyUnitsOptions={currencyUnitsOptions}
                          currencyCashOptions={currencyCashOptions}
                          onQtyTypeChange={this.onQtyTypeChange}
                          accountsList={accounts}
                          validate={this.validateOrderEntityRow}
                          onOrderEntrySelect={this.onOrderEntitySelect}
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter flexEnd>
                    <Button
                      primary
                      type="submit"
                      disabled={this.state.noOfSelectedOrders === 0}
                    >
                      Enter Selected Orders{' '}
                      {this.state.noOfSelectedOrders > 0
                        ? `(${this.state.noOfSelectedOrders})`
                        : ''}
                    </Button>
                    <Button onClick={this.addNewOrderEntry}>
                      Add More Orders
                    </Button>
                    <Button
                      onClick={this.removeSelectedOrderEntry}
                      disabled={this.state.noOfSelectedOrders === 0}
                    >
                      Remove Selected Orders
                    </Button>
                    <Button
                      onClick={this.clearForm}
                      disabled={this.state.allowClearForm}
                    >
                      Clear Form
                    </Button>
                    <Button
                      onClick={() =>
                        this.setState({ page: pages.AFT_FILE_UPLOAD })
                      }
                    >
                      Upload Orders
                    </Button>
                  </CardFooter>
                </Card>
              )}
              {page === pages.AFT_ORDER_CONFIRMATION && (
                <Mutation
                  mutation={confirmAftOrdersMutation}
                  variables={{
                    input: {
                      aftOrderRequests: this.getQueryInputForOrderEntries(
                        orderEntries,
                        false,
                      ),
                    },
                  }}
                  onCompleted={this.onOrderConfirmMutationComplete}
                  onError={this.onOrderConfirmMutationError}
                >
                  {commitOrderConfirmationMutation => (
                    <Card className={s.card}>
                      <CardHeader>
                        <CardTitle>Order Confirmation</CardTitle>
                      </CardHeader>
                      <CardContent style={{ height: '60vh' }}>
                        {this.renderHeader()}
                        {this.props.confirmOrderEntries &&
                          this.props.confirmOrderEntries.map(
                            (orderEntry, idx) =>
                              this.renderConfirmOrderEntry(orderEntry, idx),
                          )}
                      </CardContent>
                      <CardFooter flexEnd>
                        <Button
                          primary
                          disabled={
                            this.state.noOfValidConfirmSelectedOrders > 0
                          }
                          onClick={commitOrderConfirmationMutation}
                        >
                          Confirm Orders
                        </Button>

                        <Button
                          onClick={this.removeSelectedConfirmOrderEntries}
                          disabled={this.state.noOfConfirmSelectedOrders === 0}
                        >
                          Remove Selected Orders
                        </Button>

                        <Button onClick={this.returnToOrderEntry}>
                          Return to Orders Entry
                        </Button>
                      </CardFooter>
                      <Snackbar
                        message={this.state.message || ''}
                        alertStyle={this.state.snackbar}
                        active={!!this.state.snackbar}
                        onDismiss={() => {
                          this.setState({
                            snackbar: null,
                            page: pages.AFT_ORDER_ENTRY,
                          })
                          this.props.history.push('/trade/blotter')
                        }}
                        timeout={2000}
                      />
                    </Card>
                  )}
                </Mutation>
              )}
              {page === pages.AFT_FILE_UPLOAD && (
                <AFTOrderEntryFileUpload
                  title="Upload Orders"
                  returnToOrderEntry={() => {
                    this.props.resetForm()
                    this.handlePageNav(pages.AFT_ORDER_ENTRY)
                  }}
                  confirmUploadedOrderEntries={this.confirmUploadedOrderEntries}
                />
              )}
            </form>
          )
        }}
      </Mutation>
    )
  }
}

export default AFTOrderEntryForm
