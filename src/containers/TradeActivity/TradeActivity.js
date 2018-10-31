import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  FillContainer,
  ResultCount,
} from '@fc/react-playbook'

import TradeActivityGrid from '../TradeActivityGrid'
import s from './TradeActivity.scss'
import columns from './TradeActivityColumns'
import GridProvider from '../../components/Grid/GridProvider'

const query = gql`
  query TradeActivityGridQuery {
    viewer {
      searchOrders {
        id
        orderStatus
        orderId
        submitDate
        tradeDate
        redemptionFeeType
        redemptionFee
        totalShares
        settlementAmt
        fundAccount {
          providerAccountNumber
          fund {
            id
            name
            longName
            cusip
            isin
            iso
            sedol
            ticker
            provider {
              name
            }
            statistics {
              latestPrice
            }
          }
          account {
            name
            division {
              name
            }
            client {
              name
            }
            tradeInstitution {
              location {
                name
              }
              institution {
                name
              }
            }
          }
        }
        investorUid
        side
        quantity
        qtyDecimals
        currency {
          currencyCode
        }
        qtyType
        settlementDate
        cashSettlementStatus
        custodySettlementStatus
        quantity
        cashInstruction {
          name
          custodianName
          custodianAccount
          custodianBIC
          cashCutoffTimeDisplay
        }
        custodyInstruction {
          name
          custodianName
          custodianAccount
          custodianBIC
        }
      }
    }
  }
`

class TradeActivity extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }),
    title: PropTypes.node.isRequired,
  }

  state = {
    totalCount: 0,
    displayCount: 0,
  }

  onGridDataLoad = ({ totalCount, displayCount }) => {
    const {
      totalCount: currentTotalCount,
      displayCount: currentDisplayCount,
    } = this.state
    if (
      totalCount !== currentTotalCount ||
      displayCount !== currentDisplayCount
    ) {
      this.setState({
        totalCount,
        displayCount,
      })
    }
  }

  render() {
    const { title } = this.props
    const { totalCount, displayCount } = this.state

    return (
      <FillContainer>
        <GridProvider columns={columns} id="trade-activity">
          <Query query={query}>
            {({ loading, error, data }) => {
              if (error) return `Error! ${error.message}`

              return (
                <Card className={cx(s.gridCard)}>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <TradeActivityGrid
                    {...data}
                    isLoading={loading}
                    onDataLoad={this.onGridDataLoad}
                  />
                  <CardFooter flexEnd>
                    <ResultCount
                      totalCount={totalCount}
                      displayCount={displayCount}
                    />
                  </CardFooter>
                </Card>
              )
            }}
          </Query>
        </GridProvider>
      </FillContainer>
    )
  }
}

export default TradeActivity
