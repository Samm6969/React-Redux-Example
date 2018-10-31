import React, { Component } from 'react'
import { FillContainer } from '@fc/react-playbook'
import AFTOrderEntryForm from '../../containers/AFTOrderEntryForm/AFTOrderEntryForm'

const AgentFundTradingRoute = ({ title }) =>
  class extends Component {
    render() {
      return (
        <FillContainer>
          <AFTOrderEntryForm {...this.props} title={title} />
        </FillContainer>
      )
    }
  }

export default AgentFundTradingRoute
