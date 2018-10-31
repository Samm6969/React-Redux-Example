import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Checkbox from '../Checkbox'
import { idSymbol } from './gridUtils'

class CheckColumn extends Component {
  static propTypes = {
    column: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    onDeselect: PropTypes.func.isRequired,
    onSelectionChanged: PropTypes.func,
    getRecordId: PropTypes.func,
    totalCount: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    selected: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    record: PropTypes.object,
  }

  get checked() {
    const { selected, column, record, getRecordId, totalCount } = this.props
    const selectedRecords = selected[column[idSymbol] || column.id] || []
    // Handle header checkbox
    if (!record) {
      return totalCount !== 0 && totalCount === selectedRecords.length
    }
    return !!_.find(
      selectedRecords,
      item => getRecordId(item) === getRecordId(record),
    )
  }

  onChange = e => {
    // console.log(this.props)
    const { onDeselect, onSelect, onSelectionChanged, ...rest } = this.props
    const { checked } = e.target

    if (checked && typeof onSelect === 'function') {
      onSelect(rest)
    }

    if (!checked && typeof onDeselect === 'function') {
      onDeselect(rest)
    }
  }

  render() {
    return <Checkbox checked={this.checked} onChange={this.onChange} />
  }
}

export default CheckColumn
