import React, { Component } from 'react'
import SearchFunds from '../../containers/SearchFunds'

const SearchFundRoute = ({ title, fundType, accountType }) =>
  class extends Component {
    render() {
      return (
        <SearchFunds
          {...this.props}
          title={title}
          fundType={fundType}
          accountType={accountType}
        />
      )
    }
  }

export default SearchFundRoute
