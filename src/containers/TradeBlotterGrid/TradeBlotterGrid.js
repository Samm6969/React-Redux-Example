import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Grid from '../../components/Grid'

// TODO: [NOT IN SPRINT] Use subscription to get real time trade data

// notes on subscription: One thing manages receiving new events (deltas), with an id and a new property value, then uses updater function to merge them into the store
class TradeBlotterGrid extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    viewer: PropTypes.shape({
      recentOrders: PropTypes.arrayOf(
        PropTypes.shape({
          orderId: PropTypes.number.isRequired,
          orderStatus: PropTypes.string.isRequired,
        }),
      ),
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    selectedStatus: PropTypes.string.isRequired,
    updateCounts: PropTypes.func.isRequired,
  }

  static defaultProps = {
    viewer: {
      recentOrders: [],
    },
  }

  state = {
    data: [],
    counts: {},
  }

  componentDidUpdate({
    selectedStatus: prevSelectedStatus,
    isLoading: prevIsLoading,
  }) {
    const { updateCounts, selectedStatus, isLoading } = this.props
    const { counts } = this.state
    if (selectedStatus !== prevSelectedStatus || isLoading !== prevIsLoading) {
      updateCounts(counts)
    }
  }

  static getDerivedStateFromProps(props) {
    const {
      viewer: { recentOrders = [] },
      selectedStatus,
    } = props
    const counts = {}

    const data = _.reduce(
      recentOrders,
      (acc, order) => {
        if (counts[order.orderStatus]) counts[order.orderStatus] += 1
        else counts[order.orderStatus] = 1
        if (selectedStatus === 'ALL' || selectedStatus === order.orderStatus) {
          acc.push({
            order,
            fund: order.fundAccount && order.fundAccount.fund,
          })
        }
        return acc
      },
      [],
    )

    return {
      data,
      counts,
    }
  }

  render() {
    const { isLoading } = this.props
    const { data } = this.state
    return <Grid data={data} isLoading={isLoading} recordId="order.id" />
  }
}

export default TradeBlotterGrid
