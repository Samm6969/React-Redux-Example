import React, { Component } from 'react'
import { FillContainer } from '@fc/react-playbook'
import _ from 'lodash'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import MMFOrderEntryForm from '../../containers/MMFOrderEntryForm'
import { getLongAccount } from '../../utils/Stringify'
import withQuery from '../../hoc/withQuery'

const query = gql`
  query OrderEntryRouteQuery($fundAccountIds: [ID]) {
    viewer {
      fundAccountsByIds(fundAccountIds: $fundAccountIds) {
        id
        fundAccountId
        supportedQtyTypes {
          buy
          sell
        }
        cashInstructions {
          id
          displayName
          custodianName
          custodianAccount
          custodianBIC
          cashCutoffTimeDisplay
          cashInstructionId
          defaultCurrencySSI
          cashBuyMsgType
        }
        custodyInstructions {
          id
          displayName
          custodianName
          custodianAccount
          custodianBIC
          custodyInstructionId
          defaultCurrencySSI
          custodyBuyMsgType
          includeCashParties
        }
      }
    }
  }
`

@withQuery({
  query,
  variables: props => {
    const { location } = props
    const fundAccountIds =
      typeof location.state !== 'undefined' &&
      typeof location.state.fundAccountIds !== 'undefined'
        ? location.state.fundAccountIds
        : []

    return {
      fundAccountIds,
    }
  },
})
class OrderEntryRoute extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    location: PropTypes.shape({
      state: PropTypes.shape({
        selected: PropTypes.arrayOf(PropTypes.object),
      }),
    }),
    viewer: PropTypes.shape({
      fundAccountsByIds: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
      ),
    }),
  }

  static defaultProps = {
    viewer: {
      fundAccountsByIds: [],
    },
  }

  get initialValues() {
    const { location, viewer } = this.props
    const selected =
      typeof location.state !== 'undefined' &&
      typeof location.state.selected !== 'undefined'
        ? location.state.selected
        : []

    const initialValues = selected.map(({ accounts, ...rest }) => {
      let mergedAccounts = _.sortBy(accounts, account =>
        getLongAccount(account.account),
      )

      mergedAccounts = _.map(accounts, account => {
        const additionalAccountInfo = _.find(
          viewer.fundAccountsByIds,
          ({ id }) => account.id === id,
        )
        // console.log(additionalAccountInfo)
        return {
          ...account,
          ...additionalAccountInfo,
        }
      })

      return {
        ...rest,
        accounts: mergedAccounts,
      }
    })

    return {
      selected: initialValues,
    }
  }

  render() {
    const { isLoading } = this.props
    return (
      <FillContainer>
        <MMFOrderEntryForm
          form={this.form}
          isLoading={isLoading}
          initialValues={this.initialValues}
          enableReinitialize
        />
      </FillContainer>
    )
  }
}

export default OrderEntryRoute
