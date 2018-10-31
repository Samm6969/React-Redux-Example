import React, { Component } from 'react'
import ValueField from '../../components/ValueField'

class MMFOrderEntryFormValueField extends Component {
  render() {
    return <ValueField inline showDelimiter {...this.props} />
  }
}

export default MMFOrderEntryFormValueField
