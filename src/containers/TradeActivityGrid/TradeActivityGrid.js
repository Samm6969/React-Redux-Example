import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Grid from '../../components/Grid'

class TradeActivityGrid extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    viewer: PropTypes.shape({
      searchOrders: PropTypes.arrayOf(
        PropTypes.shape({
          orderId: PropTypes.number.isRequired,
          orderStatus: PropTypes.string.isRequired,
        }),
      ),
    }),
    title: PropTypes.string,
  }

  static defaultProps = {
    viewer: {
      fundAccountsForInstitution: [],
    },
  }

  state = {
    data: [],
  }

  componentDidUpdate() {
    const { isLoading, onDataLoad } = this.props
    const { data } = this.state

    if (typeof onDataLoad === 'function' && !isLoading) {
      onDataLoad({
        data,
        totalCount: data.length,
        displayCount: data.length,
      })
    }
  }

  static getDerivedStateFromProps(props) {
    const data = _.map(props.viewer.searchOrders, order => ({
      order,
      fund: order.fundAccount && order.fundAccount.fund,
    }))
    return { data }
  }

  render() {
    const { data } = this.state
    return <Grid data={data} {...this.props} recordId="fund.id" />
  }
}

export default TradeActivityGrid
