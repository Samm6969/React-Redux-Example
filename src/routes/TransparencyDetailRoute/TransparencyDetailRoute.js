import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '@fc/react-playbook'

class TransparencyDetailRoute extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  }

  render() {
    const {
      location: { state },
    } = this.props

    const selectedFund =
      state && state.name
        ? `Transparency Detail Page - selected fund:${state.name} `
        : ''

    return (
      <div>
        <Snackbar message={selectedFund} alertStyle="success" active />
      </div>
    )
  }
}

export default TransparencyDetailRoute
