import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { List } from '@fc/react-playbook'

class OrderConfirmCashInstructionRenderer extends Component {
  static propTypes = {
    cashInstructionId: PropTypes.number.isRequired,
    order: PropTypes.shape({
      fundAccount: PropTypes.shape({
        cashInstructions: PropTypes.arrayOf(
          PropTypes.shape({
            cashInstructionId: PropTypes.string,
          }),
        ),
      }),
    }).isRequired,
  }

  get cashInstruction() {
    const { cashInstructionId: id, order } = this.props
    const { fundAccount } = order
    const { cashInstructions } = fundAccount
    return _.find(
      cashInstructions,
      ({ cashInstructionId }) => cashInstructionId === id.toString(),
    )
  }

  render() {
    const { cashInstruction } = this

    const {
      cashInstructionId,
      displayName,
      custodianName,
      custodianAccount,
      custodianBIC,
      cashCutoffTimeDisplay,
    } = cashInstruction

    if (cashInstructionId === '-99') {
      return <span>{displayName}</span>
    }

    return (
      <Fragment>
        <span>{displayName}</span>
        <List noStyle>
          <li>SSI Custodian Name: {custodianName}</li>
          <li>SSI Custodian Account: {custodianAccount}</li>
          <li>SSI Custodian BIC: {custodianBIC}</li>
          <li>Cash Cutoff Time: {cashCutoffTimeDisplay}</li>
        </List>
      </Fragment>
    )
  }
}

export default OrderConfirmCashInstructionRenderer
