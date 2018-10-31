import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@fc/react-playbook'
/* eslint-disable */
export default class SelectRenderer extends Component {
  static propTypes = {
    value: PropTypes.number,
    record: PropTypes.shape({
      isParent: PropTypes.bool.isRequired,
      id: PropTypes.string,
    }),
    emptyCellText: PropTypes.string.isRequired,
  }

  state = {
    checked: false,
  }

  render() {
    const { record, emptyCellText } = this.props

    if (record.isParent) return emptyCellText
    return (
      <Checkbox
        id={record.id}
        value={this.state.checked}
        onChange={() => this.setState({ checked: !this.state.checked })}
      />
    )
  }
}
