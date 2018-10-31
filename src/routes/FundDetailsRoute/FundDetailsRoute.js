import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FundDetails from '../../containers/FundDetails'

class FundDetailsRoute extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { match } = this.props
    return <FundDetails variables={{ id: match.params.id }} />
  }
}

export default FundDetailsRoute
