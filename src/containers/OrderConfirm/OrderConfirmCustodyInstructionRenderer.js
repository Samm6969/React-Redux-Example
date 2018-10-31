import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { List } from '@fc/react-playbook'

class OrderConfirmCustodyInstructionRenderer extends Component {
  static propTypes = {
    custodyInstructionId: PropTypes.number.isRequired,
    order: PropTypes.shape({
      fundAccount: PropTypes.shape({
        custodyInstructions: PropTypes.arrayOf(
          PropTypes.shape({
            custodyInstructionId: PropTypes.string,
          }),
        ),
      }),
    }).isRequired,
  }

  get custodyInstruction() {
    const { custodyInstructionId: id, order } = this.props
    const { fundAccount } = order
    const { custodyInstructions } = fundAccount
    return _.find(
      custodyInstructions,
      ({ custodyInstructionId }) => custodyInstructionId === id.toString(),
    )
  }

  render() {
    const { custodyInstruction } = this

    const {
      custodyInstructionId,
      displayName,
      custodianName,
      custodianAccount,
      custodianBIC,
    } = custodyInstruction

    if (custodyInstructionId === '-99') {
      return <span>{displayName}</span>
    }

    return (
      <Fragment>
        <span>{displayName}</span>
        <List noStyle>
          <li>SSI Custodian Name: {custodianName}</li>
          <li>SSI Custodian Account: {custodianAccount}</li>
          <li>SSI Custodian BIC: {custodianBIC}</li>
        </List>
      </Fragment>
    )
  }
}

export default OrderConfirmCustodyInstructionRenderer
