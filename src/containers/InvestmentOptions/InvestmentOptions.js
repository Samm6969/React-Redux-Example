import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import _ from 'lodash'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import gql from 'graphql-tag'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  FillContainer,
  LinkButton,
  ResultCount,
  Icon,
} from '@fc/react-playbook'
import { Query } from 'react-apollo'

import s from './InvestmentOptions.scss'
import AccountSelector from '../AccountSelector'
// import InvestmentOptionsGrid from '../InvestmentOptionsGrid'
import FlexColumnLayout from '../../components/FlexColumnLayout'
import Input from '../../components/Input'
import { GridProvider, GridCustomizeColumnsModal } from '../../components/Grid'
import columns from './InvestmentOptionsColumns'
import { Menu } from '../../components/Menu'
import MenuItem from '../../components/Menu/MenuItem'
import MenuSpacer from '../../components/Menu/MenuSpacer'
import InvestmentOptionsGrid from '../InvestmentOptionsGrid'

const selector = formValueSelector('tradeOnBehalfOf')

const mapStateToProps = state => {
  const tradeOnBehalfOf = selector(state, 'tradeOnBehalfOf')
  return {
    tradeOnBehalfOf:
      typeof tradeOnBehalfOf === 'string' ? null : tradeOnBehalfOf,
  }
}

const query = gql`
  query InvestmentOptionsQuery(
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
          autoPopulateDefaultSsi
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
          fundRoutingAutoSettlementSupported
          providerSettlementInstructionAssociated
          defaultPrice
          stableNav
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
          id
          tradeWindowsId
          addedBy
          cobrandId
          endTime
          expectedPriceTime
          fundId
          fundTimezoneId
          fundTimezoneName
          invAccountId
          providerTradeWindowRef
          redEndTime
          redemptionSettlementPeriod
          startTime
          subEndTime
          subscriptionSettlementPeriod
        }
      }
    }
  }
`

@connect(mapStateToProps)
class InvestmentOptions extends Component {
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
    viewer: PropTypes.shape({
      fundAccountsForInstitution: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
      ),
    }),
  }

  static defaultProps = {
    tradeOnBehalfOf: null,
    viewer: {
      fundAccountsForInstitution: [],
    },
  }

  state = {
    account: null,
    selected: [],
    totalCount: 0,
    displayCount: 0,
    search: '',
    showCustomizeMenu: false,
    openCustomizeColumns: false,
  }

  debounceSearch = _.debounce(e => {
    const search = e.target.value
    this.setState({
      search,
    })
  }, 300)

  openCustomizeColumnsModal = () => {
    this.setState({
      openCustomizeColumns: true,
    })
  }

  closeCustomizeColumnsModal = () => {
    this.setState({
      openCustomizeColumns: false,
    })
  }

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

  getSelectedFundAccountIds = selected => {
    let accountIdList = []
    _.forEach(selected, fund => {
      const accounts = _.get(fund, 'accounts')
      const listOfIds = accounts.map(account => account.id)
      if (!_.isEmpty(listOfIds)) {
        accountIdList = accountIdList.concat(listOfIds)
      }
    })
    if (!_.isEmpty(accountIdList)) {
      accountIdList = _.uniq(accountIdList)
    }
    return accountIdList
  }

  onSelectionChanged = selected => {
    this.setState({
      selected: selected['direct-investment-options-grid-trade-select-column'],
    })
  }

  onSearch = e => {
    e.persist()
    this.debounceSearch(e)
  }

  showCustomizeMenu = e => {
    const { target } = e
    this.setState(({ showCustomizeMenu }) => ({
      showCustomizeMenu: !showCustomizeMenu,
      anchorEl: target,
    }))
  }

  onCloseCustomizeMenu = () => {
    this.setState({
      showCustomizeMenu: false,
    })
  }

  render() {
    const { match, tradeOnBehalfOf, title, fundType, accountType } = this.props
    const {
      account,
      selected,
      totalCount,
      displayCount,
      // search,
      showCustomizeMenu,
      anchorEl,
      openCustomizeColumns,
      search,
    } = this.state
    const selectedFundAccountIds = this.getSelectedFundAccountIds(selected)

    return (
      <FillContainer>
        <FlexColumnLayout>
          <Card>
            <CardContent className={s.selectorCardContent}>
              <AccountSelector
                variables={{
                  institutionLocationId:
                    tradeOnBehalfOf && tradeOnBehalfOf.id
                      ? tradeOnBehalfOf.id
                      : null,
                }}
                tradeOnBehalfOf={tradeOnBehalfOf}
                onChange={this.onAccountChange}
                accountType={accountType}
              />
            </CardContent>
          </Card>
          <GridProvider columns={columns} id="direct-investment-options-grid">
            <Query
              query={query}
              variables={{
                institutionLocationId:
                  tradeOnBehalfOf && tradeOnBehalfOf.id
                    ? tradeOnBehalfOf.id
                    : null,
                accountIds: account && account.id ? [account.id] : [],
                fundType,
                accountType,
              }}
            >
              {({ loading, error, data, refetch }) => {
                if (error) return `Error! ${error.message}`

                return (
                  <Card className={cx(s.gridCard)}>
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <div>
                        <Input onChange={this.onSearch} />
                        <Icon
                          name="material-more-horizontal"
                          onClick={this.showCustomizeMenu}
                        />
                        <Menu
                          anchorEl={anchorEl}
                          open={showCustomizeMenu}
                          onClose={this.onCloseCustomizeMenu}
                        >
                          <MenuItem onSelect={this.openCustomizeColumnsModal}>
                            Customize Columns
                          </MenuItem>
                          <MenuItem closeOnSelect={false}>Group By</MenuItem>
                          <MenuSpacer />
                          <MenuItem onSelect={() => refetch()}>
                            Refresh
                          </MenuItem>
                          <MenuSpacer />
                          <MenuItem>Save Current Settings</MenuItem>
                          <MenuItem>Restore Saved Settings</MenuItem>
                          <MenuItem>Restore Default Settings</MenuItem>
                        </Menu>
                        <GridCustomizeColumnsModal
                          open={openCustomizeColumns}
                          onClose={this.closeCustomizeColumnsModal}
                        />
                      </div>
                    </CardHeader>
                    <InvestmentOptionsGrid
                      {...data}
                      isLoading={loading}
                      onSelectionChanged={this.onSelectionChanged}
                      query={search}
                      onDataLoad={this.onGridDataLoad}
                    />
                    <CardFooter flexEnd>
                      <ResultCount
                        totalCount={totalCount}
                        displayCount={displayCount}
                      />
                      <LinkButton
                        primary
                        to={{
                          pathname: `${match.url}/order-entry`,
                          state: {
                            selected,
                            fundAccountIds: selectedFundAccountIds,
                            accountType,
                          },
                        }}
                        disabled={!selected || selected.length === 0}
                      >
                        Trade Selected Funds
                      </LinkButton>
                    </CardFooter>
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

export default InvestmentOptions
