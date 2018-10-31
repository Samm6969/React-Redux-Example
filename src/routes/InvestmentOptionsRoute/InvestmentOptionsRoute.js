import React, { Component } from 'react'

import InvestmentOptions from '../../containers/InvestmentOptions'

const InvestmentOptionsRoute = ({ title, fundType, accountType }) =>
  class extends Component {
    render() {
      return (
        <InvestmentOptions
          {...this.props}
          title={title}
          fundType={fundType}
          accountType={accountType}
        />
      )
    }
  }

export default InvestmentOptionsRoute
