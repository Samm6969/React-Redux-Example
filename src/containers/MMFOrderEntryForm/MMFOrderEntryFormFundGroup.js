import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'redux-form'

import MMFOrderEntryFormAccountList from './MMFOrderEntryFormAccountList'

import OrderFundGroup from '../OrderFundGroup'

class MMFOrderEntryFormFundGroup extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      map: PropTypes.func,
    }),
  }

  render() {
    const { fields } = this.props
    return fields.map((member, index) => {
      const { fund } = fields.get(index)

      return (
        <OrderFundGroup key={member} fund={fund}>
          <FieldArray
            name={`${member}.accounts`}
            component={MMFOrderEntryFormAccountList}
          />
        </OrderFundGroup>
      )
    })
  }
}

export default MMFOrderEntryFormFundGroup
