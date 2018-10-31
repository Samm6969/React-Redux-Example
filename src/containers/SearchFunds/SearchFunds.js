import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import _ from 'lodash'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
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

import s from './SearchFunds.scss'
import GridProvider from '../../components/Grid/GridProvider'
import columns from './SearchFundsColumns'
import Input from '../../components/Input'
import SearchFundsGrid from '../SearchFundsGrid'

const selector = formValueSelector('tradeOnBehalfOf')

const mapStateToProps = state => {
  const tradeOnBehalfOf = selector(state, 'tradeOnBehalfOf')
  return {
    tradeOnBehalfOf:
      typeof tradeOnBehalfOf === 'string' ? null : tradeOnBehalfOf,
  }
}

const query = gql`
  query SearchFundsGridQuery(
    $institutionLocationId: ID
    $accountIds: [ID]
    $accountType: String
    $fundType: String
  ) {
    viewer {
      fundAccountsForInstitution(
        institutionLocationId: $institutionLocationId
        accountIds: $accountIds
        accountType: $accountType
        fundType: $fundType
      ) {
        id
        account {
          name
          division {
            name
          }
          client {
            name
          }
          executePermission
          tradeInstitution {
            location {
              name
            }
            institution {
              name
            }
          }
        }
        balance {
          balanceDt
          shares
          balanceAmt
          balanceAmtUSDE
          estimatedMarketValue
          estimatedMarketValueUSDE
          accruedAmt
          currencyCode
          value
          percentageOwned
          stale
          fxRateDTO {
            usdMid
            stale
            effectiveDate
          }
        }
        fund {
          id
          fundId
          fundType
          provider {
            name
          }
          name
          longName
          fundCategory {
            name
          }
          fundSubCategory {
            name
          }
          currency {
            currencyCode
          }
          domicileCountry {
            name
          }
          autoSettlementModel
          settlementPeriod
          contactName
          contactPhone
          cusip
          isin
          iso
          sedol
          ticker
          otherFundCode
          overrideSettlementDate
          supportedRedemptionFeeTypes
          expenseRatio
          fundWholeHoliday
          statistics {
            fitchRating
            moodyRating
            naicRating
            spRating
            aum
            dailyFactor
            nav
            shadowNav
            netFlows
            wam
            yld1Day
            yld7Day
            yld30Day
            liquidity1Day
            liquidity7Day
            stale
            dtEffective
            priceStale
            priceDtEffective
          }
          supportTradeWindows
          subCutoffTime
          subCutoffTimeType
          redCutoffTime
          redCutoffTimeType
          taxable
          earlyCloseOrHoliday
          redemptionFeeInEffect
          redemptionGate
          subscriptionGate
        }
        tradeWindows {
          startTime
          endTime
          fundTimezoneName
          tradeWindowsId
          providerTradeWindowRef
          expectedPriceTime
          redEndTime
          subEndTime
          subscriptionSettlementPeriod
          redemptionSettlementPeriod
        }
      }
    }
  }
`

@connect(mapStateToProps)
class SearchFunds extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    tradeOnBehalfOf: PropTypes.shape({
      id: PropTypes.string,
    }),
    title: PropTypes.node.isRequired,
    fundType: PropTypes.string.isRequired,
    accountType: PropTypes.string.isRequired,
  }

  static defaultProps = {
    tradeOnBehalfOf: null,
  }

  state = {
    account: null,
    totalCount: 0,
    displayCount: 0,
    search: '',
  }

  debounceSearch = _.debounce(e => {
    const search = e.target.value
    this.setState({
      search,
    })
  }, 300)

  onAccountChange = ({ account = null }) => {
    this.setState({ account })
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

  onSearch = e => {
    e.persist()
    this.debounceSearch(e)
  }

  render() {
    const { tradeOnBehalfOf, title, fundType, accountType } = this.props
    const { account, totalCount, displayCount, search } = this.state

    return (
      <FillContainer>
        <GridProvider columns={columns} id="search-funds-grid">
          <Query
            query={query}
            variables={{
              institutionLocationId:
                tradeOnBehalfOf && tradeOnBehalfOf.id
                  ? tradeOnBehalfOf.id
                  : null,
              accountIds: account ? [account.id] : [],
              fundType,
              accountType,
            }}
          >
            {({ loading, error, data }) => {
              if (error) return `Error! ${error.message}`

              return (
                <Card className={cx(s.gridCard)}>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <Input onChange={this.onSearch} />
                  </CardHeader>
                  <SearchFundsGrid
                    {...data}
                    isLoading={loading}
                    query={search}
                    fundType={fundType}
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

export default SearchFunds
