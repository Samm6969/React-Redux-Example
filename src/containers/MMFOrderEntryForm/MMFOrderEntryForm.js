import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  LoadingIndicator,
  Snackbar,
} from '@fc/react-playbook'
import {
  change as changeAction,
  FieldArray,
  Form,
  SubmissionError,
} from 'redux-form'
import _ from 'lodash'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import moment from 'moment'

import MMFOrderEntryFormFundGroup from './MMFOrderEntryFormFundGroup'
import reduxForm from '../../hoc/reduxForm'
import s from '../../routes/OrderEntryRoute/OrderEntryRoute.scss'

import { MMFOrderEntryFormProvider } from './MMFOrderEntryFormContext'
import OrderConfirm from '../OrderConfirm'

const orderEntryFormMutation = gql`
  mutation MMFOrderEntryFormMutation($input: OrderRequestsInput!) {
    enterOrders(input: $input) {
      id
      orderResponsesId
      tradeValidationSummaryMessages
      orderResponses {
        id
        orderResponseId
        orderRequest {
          id
          fundAccountId
          side
          qtyType
          quantity
          tradeDate
          redemptionFeeType
          overriddenSettlementPeriod
          userTradeWindowId
          investorCashSettlementInstruction
          investorCustodySettlementInstruction
          investorPaymentInstruction
          comments
          approvalMessage
        }
        fundAccount {
          id
        }
        tradeInputValidationErrors {
          errorCode
          errorText
        }
        tradeBusinessRulesValidationErrors {
          errorCode
          errorMessage
          errorLevel
        }
        tradeComplianceRulesValidationErrors {
          errorCode
          errorMessage
          errorLevel
        }
      }
    }
  }
`

const orderConfirmationMutation = gql`
  mutation OrderConfirmMutation($input: OrderRequestsInput!) {
    confirmOrders(input: $input) {
      id
      orderResponsesId
      orderResponses {
        orderId
        orderStatus
      }
    }
  }
`

const pages = {
  ORDER_ENTRY: 'ORDER_ENTRY',
  ORDER_CONFIRMATION: 'ORDER_CONFIRMATION',
}

const mapDispatchToProps = dispatch => ({
  setFormValue: (...args) => dispatch(changeAction(...args)),
})

@withRouter
@connect(
  null,
  mapDispatchToProps,
)
@reduxForm({
  form: 'MMFOrderEntryForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})
class MMFOrderEntryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
    }),
    reset: PropTypes.func,
    form: PropTypes.string,
    setFormValue: PropTypes.func,
    destroy: PropTypes.func,
    location: PropTypes.shape({
      state: PropTypes.shape({
        selected: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
    onSelectionChange: PropTypes.func,
    // invalid: PropTypes.bool,
  }

  state = {
    defaultSettlementInstructions: new Map(),
    selectedMembers: [],
    page: pages.ORDER_ENTRY,
  }

  componentWillUnmount() {
    this.props.destroy()
  }

  getOrder = account => {
    const { id, order } = account
    const {
      orderSide,
      quantityType,
      amount,
      comment,
      commentToApproval,
      redemptionType,
      settlementDate,
      tradeWindow,
      tradeDate,
      cashSettlementInstructions,
      custodySettlementInstructions,
    } = order

    return {
      fundAccountId: id,
      side: _.toUpper(orderSide.value),
      qtyType: _.toUpper(quantityType.label),
      quantity: parseFloat(amount.value),
      tradeDate:
        typeof tradeDate === 'object'
          ? tradeDate.format('YYYY-MM-DD')
          : moment(tradeDate, 'MM/DD/YYYY').format('YYYY-MM-DD'),
      comments: comment,
      approvalMessage: commentToApproval,
      redemptionFeeType:
        redemptionType && redemptionType.value ? redemptionType.value : null,
      overriddenSettlementPeriod: settlementDate ? settlementDate.value : null,
      userTradeWindowId:
        tradeWindow && !_.isUndefined(tradeWindow.tradeWindowsId)
          ? parseInt(tradeWindow.tradeWindowsId, 10)
          : null,
      investorCashSettlementInstruction:
        cashSettlementInstructions &&
        !_.isUndefined(cashSettlementInstructions.cashInstructionId)
          ? parseInt(cashSettlementInstructions.cashInstructionId, 10)
          : null,
      investorCustodySettlementInstruction:
        custodySettlementInstructions &&
        !_.isUndefined(custodySettlementInstructions.custodyInstructionId)
          ? parseInt(custodySettlementInstructions.custodyInstructionId, 10)
          : null,
    }
  }

  createOnSubmit = commitMutation => async values => {
    const { selectedMembers } = this.state
    const selected = []
    const orderRequests = []
    selectedMembers.forEach(member => {
      const account = _.get(values, member)
      account.member = member
      if (account) {
        selected.push(account)
        const order = this.getOrder(account)
        orderRequests.push(order)
      }
    })
    const { data } = await commitMutation({
      variables: {
        input: {
          clientMutationId: _.uniqueId('mmf-order-request'),
          orderRequests,
        },
      },
    })
    const { enterOrders: enterOrdersRes } = data
    const errors = {}
    const enterOrders = {
      ...enterOrdersRes,
      orderResponses: enterOrdersRes.orderResponses.map(order => ({
        ...order,
        fundAccount: _.find(selected, ({ id }) => id === order.fundAccount.id),
      })),
    }

    let hasErrors = false
    enterOrders.orderResponses.forEach(
      ({ tradeInputValidationErrors, fundAccount }) => {
        if (tradeInputValidationErrors.length !== 0) {
          hasErrors = true
          _.set(
            errors,
            `${fundAccount.member}.tradeInputValidationErrors`,
            tradeInputValidationErrors,
          )
        }
      },
    )

    if (hasErrors) {
      throw new SubmissionError(errors)
    }

    if (!hasErrors) {
      this.gotoOrderConfirmation(enterOrders, orderRequests)
    }
  }

  onOrderEntryMutationError = e => {
    // eslint-disable-next-line no-console
    console.error(e)
  }

  onOrderConfirmMutationComplete = response => {
    const orderId = _.get(response, 'confirmOrders.orderResponses[0].orderId')
    this.setState({
      snackbar: 'success',
      message: `Order ( ${orderId} ) has been created successfully`,
    })
  }

  onOrderConfirmMutationError = e => {
    // eslint-disable-next-line no-console
    console.error(e)
    this.setState({
      snackbar: 'error',
      message:
        'Order did not create successfully, please contact administrator',
    })
  }

  onOrderSelectionChange = (event, newValue, previousValue, name) => {
    this.setState(state => {
      const { onSelectionChange } = this.props
      const { selectedMembers } = state
      const accountMember = name.replace('.selectedForTrade', '')
      if (newValue) {
        selectedMembers.push(accountMember)
      } else {
        // Mutates the original array
        _.remove(selectedMembers, member => member === accountMember)
      }

      if (typeof onSelectionChange === 'function') {
        onSelectionChange(selectedMembers)
      }

      return {
        selectedMembers,
      }
    })
  }

  setDefaultSSI = (add, field, value) => {
    this.setState(state => {
      const { defaultSettlementInstructions } = state
      const hasField = defaultSettlementInstructions.has(field)

      if (!hasField && add) {
        defaultSettlementInstructions.set(field, value)
      }

      if (hasField && !add) {
        defaultSettlementInstructions.delete(field)
      }

      return {
        defaultSettlementInstructions,
      }
    })
  }

  gotoOrderEntry = () => {
    this.setState({
      page: pages.ORDER_ENTRY,
      enterOrders: null,
      orderRequests: null,
    })
  }

  gotoOrderConfirmation = (enterOrders, orderRequests) => {
    this.setState({
      page: pages.ORDER_CONFIRMATION,
      enterOrders,
      orderRequests,
    })
  }

  handleCancel = () => {
    const { history } = this.props
    history.goBack()
  }

  handleReset = () => {
    const { reset } = this.props
    reset()
    this.setState({
      selectedMembers: [],
    })
  }

  handleDefaultSettlementInstructions = () => {
    const { setFormValue, form } = this.props
    const { defaultSettlementInstructions } = this.state
    defaultSettlementInstructions.forEach((value, field) => {
      setFormValue(form, field, value)
    })
  }

  render() {
    const {
      isLoading,
      location,
      pristine,
      submitting,
      handleSubmit,
    } = this.props

    const {
      selectedMembers,
      defaultSettlementInstructions,
      page,
      enterOrders,
      orderRequests,
    } = this.state

    const disabled = pristine || submitting || selectedMembers.length === 0

    return (
      <Mutation
        mutation={orderEntryFormMutation}
        onError={this.onOrderEntryMutationError}
      >
        {(commitOrderEntryFormMutation, { loading: mutationLoading }) => {
          const loading = isLoading || submitting || mutationLoading
          const onSubmit = this.createOnSubmit(commitOrderEntryFormMutation)
          return (
            <Form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: 'flex',
                flex: 1,
              }}
              autoComplete="off"
            >
              {page === pages.ORDER_ENTRY && (
                <Card className={s.card}>
                  <CardHeader>
                    <CardTitle>Order Entry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading && <LoadingIndicator />}
                    {!loading && (
                      <MMFOrderEntryFormProvider
                        value={{
                          onOrderSelectionChange: this.onOrderSelectionChange,
                          setDefaultSSI: this.setDefaultSSI,
                          accountType: location.state.accountType,
                        }}
                      >
                        <FieldArray
                          name="selected"
                          component={MMFOrderEntryFormFundGroup}
                        />
                      </MMFOrderEntryFormProvider>
                    )}
                  </CardContent>
                  <CardFooter flexEnd>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button disabled={disabled} onClick={this.handleReset}>
                      Clear Form
                    </Button>
                    <Button
                      disabled={defaultSettlementInstructions.size === 0}
                      onClick={this.handleDefaultSettlementInstructions}
                    >
                      Default Settlement Instructions
                    </Button>
                    <Button primary type="submit" disabled={disabled}>
                      Enter Orders{' '}
                      {selectedMembers.length !== 0 &&
                        `(${selectedMembers.length})`}
                    </Button>
                  </CardFooter>
                </Card>
              )}
              {page === pages.ORDER_CONFIRMATION && (
                <Mutation
                  mutation={orderConfirmationMutation}
                  variables={{
                    input: {
                      clientMutationId: _.uniqueId('mmf-order-request-confirm'),
                      orderRequests: this.state.orderRequests,
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
                      <CardContent>
                        {loading && <LoadingIndicator />}
                        {!loading && (
                          <OrderConfirm
                            enterOrders={enterOrders}
                            orderRequests={orderRequests}
                            gotoOrderEntry={this.gotoOrderEntry}
                          />
                        )}
                      </CardContent>
                      <CardFooter flexEnd>
                        <Button onClick={this.handleCancel}>Cancel</Button>
                        <Button onClick={this.gotoOrderEntry}>
                          Back to Order Entry
                        </Button>
                        <Button
                          primary
                          onClick={commitOrderConfirmationMutation}
                        >
                          Confirm Orders
                        </Button>
                      </CardFooter>
                      <Snackbar
                        message={this.state.message || ''}
                        alertStyle={this.state.snackbar}
                        active={!!this.state.snackbar}
                        onDismiss={() => {
                          const { history } = this.props
                          this.setState({ snackbar: null })
                          history.push('/trade/blotter')
                        }}
                        timeout={2000}
                      />
                    </Card>
                  )}
                </Mutation>
              )}
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default MMFOrderEntryForm
