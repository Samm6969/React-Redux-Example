import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import cx from 'classnames'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  FillContainer,
} from '@fc/react-playbook'

import TradeBlotterGrid from '../TradeBlotterGrid'
import TradeBlotterFilters from './TradeBlotterFilters'
import FlexColumnLayout from '../../components/FlexColumnLayout'
import columns from './TradeBlotterColumns'
import GridProvider from '../../components/Grid/GridProvider'
// import FlexColumnLayout from '../../components/FlexColumnLayout'

const query = gql`
  query TradeBlotterGridQuery {
    viewer {
      recentOrders {
        id
        orderStatus
        orderId
        submitDate
        tradeDate
        ... on AFTOrder {
          fundName
          invAccountName
        }
        ... on MMFOrder {
          fundAccount {
            fund {
              id
              name
            }
            account {
              name
            }
          }
          cashSettlementStatus
          custodySettlementStatus
        }
        investorUid
        side
        quantity
        qtyDecimals
        numberOfApprovalsRequired
        numberOfApprovalsObtained
        currency {
          currencyCode
        }
        qtyType
        settlementDate
      }
    }
  }
`

class TradeBlotter extends Component {
  state = {
    selectedStatus: 'ALL',
    counts: {},
  }
  /* TODO: Filters
      Settlement Approval Required
  */

  handleFilterChange = status => {
    this.setState({
      selectedStatus: status,
    })
  }

  updateCounts = counts => {
    this.setState({
      counts,
    })
  }

  render() {
    const { counts, selectedStatus } = this.state
    return (
      <FillContainer>
        <FlexColumnLayout>
          <TradeBlotterFilters
            counts={counts}
            selectedStatus={selectedStatus}
            handleFilterChange={this.handleFilterChange}
          />
          <GridProvider columns={columns} id="trade-blotter-grid">
            <Query query={query}>
              {({ loading, error, data }) => {
                if (error) return `Error! ${error.message}`

                return (
                  <Card style={{ flex: 1 }}>
                    <CardHeader>
                      <CardTitle>Trade Blotter</CardTitle>
                    </CardHeader>
                    <TradeBlotterGrid
                      {...data}
                      isLoading={loading}
                      selectedStatus={selectedStatus}
                      updateCounts={this.updateCounts}
                    />
                    <CardFooter />
                  </Card>
                )
              }}
            </Query>
          </GridProvider>
        </FlexColumnLayout>
      </FillContainer>
    )
  }
}

export default TradeBlotter
