import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader'
import {
  Header,
  Footer,
  RouteBuilder,
  RoutesProvider,
  RoutesConsumer,
  LoadingIndicator,
  LegacyBrowserNotification,
  SecondaryNavigation,
  SidebarNavigation,
  PageNotFound,
  FillContainer,
  UIErrorBoundary,
  SessionTimeoutWarning,
  SessionProvider,
} from '@fc/react-playbook'

import UserDropdown from '../UserDropdown'

import Client from '../../ApolloClient'
import s from './App.scss'
import appRoutes from '../../routes'
import navLinks from '../../navLinks'
import Logout from '../../utils/Logout'
import TradeOnBehalfOfSelector from '../TradeOnBehalfOfSelector'

const query = gql`
  query AppNavigationQuery {
    viewer {
      investorPermissions {
        userNavigations {
          tradeAFT
          tradeETF
          tradeETFBloombergBasket
          tradeLongTerm
          tradeNonDirect
          tradeShortTerm
          tradeBlotter
          accountSummaryReport
          capitalAdvisorsRatings
          dashboard
          emailNotifications
          fundStatisticsReport
          holdingsReport
          intradayPricesReport
          manager
          portfolio
          preferences
          searchFunds
          settlementInstructions
          tradeActivityReport
          transparencyConnect
        }
      }
    }
  }
`

@withRouter
@DragDropContext(HTML5Backend)
@connect(({ environment, Settings }) => ({
  environment,
  Settings,
}))
class App extends Component {
  static propTypes = {
    environment: PropTypes.string,
  }

  filterLinks = (navigationPermissions, links) =>
    links.reduce((visibleLinks, link) => {
      const items = link.items
        ? this.filterLinks(navigationPermissions, link.items)
        : undefined
      const linkWithFilteredItems = items ? { ...link, items } : link

      if (linkWithFilteredItems.permission) {
        if (navigationPermissions[linkWithFilteredItems.permission] !== false) {
          visibleLinks.push(linkWithFilteredItems)
        }
      } else if (!linkWithFilteredItems.permission) {
        visibleLinks.push(linkWithFilteredItems)
      }

      return visibleLinks
    }, [])

  filterRoutes = (navigationPermissions, routes) =>
    routes.filter(route => navigationPermissions[route.permission] !== false)

  render() {
    const { environment } = this.props
    const version = `v${process.env.VERSION}`

    return (
      <SessionProvider onLogout={Logout}>
        <ApolloProvider client={Client}>
          <Query query={query}>
            {({ error, loading, data }) => {
              if (loading) return <LoadingIndicator />
              if (error)
                return (
                  <FillContainer>
                    <PageNotFound />
                  </FillContainer>
                )
              const navigationPermissions =
                data.viewer.investorPermissions.userNavigations

              const filteredRoutes = this.filterRoutes(
                navigationPermissions,
                appRoutes,
              )

              const filteredLinks = this.filterLinks(
                navigationPermissions,
                navLinks,
              )

              return (
                <RoutesProvider value={{ routes: filteredRoutes }}>
                  <div className={s.root}>
                    <LegacyBrowserNotification />
                    <Header
                      serviceName="Fund Connect"
                      environment={environment}
                    >
                      <TradeOnBehalfOfSelector
                        initialValues={{ tradeOnBehalfOf: null }}
                      />
                      <UserDropdown />
                    </Header>
                    <SecondaryNavigation />
                    <div className={s.layout}>
                      <SidebarNavigation links={filteredLinks} />
                      <RoutesConsumer>
                        {({ routes }) => (
                          <RouteBuilder
                            routes={routes}
                            pageNotFound={() => (
                              <FillContainer>
                                <PageNotFound />
                              </FillContainer>
                            )}
                            render={({
                              provider: Provider = Fragment,
                              component: RouteComponent,
                              ...rest
                            }) => (
                              <div className={s.page}>
                                <UIErrorBoundary>
                                  <Provider>
                                    <RouteComponent {...rest} />
                                  </Provider>
                                </UIErrorBoundary>
                              </div>
                            )}
                          />
                        )}
                      </RoutesConsumer>
                    </div>
                    <Footer version={version} />
                  </div>
                  <div id="portal" />
                  <SessionTimeoutWarning />
                </RoutesProvider>
              )
            }}
          </Query>
        </ApolloProvider>
      </SessionProvider>
    )
  }
}

export default hot(module)(App)

// export default App
