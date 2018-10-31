import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tooltip } from '@fc/react-playbook'

import { isUndefinedNull } from '../../utils/utils'
import EmptyCellRenderer from '../EmptyCellRenderer'
import DateFormatter from '../../components/DateFormatter'

const UpdateDateColumnRenderer = ({ dateKey } = {}) => {
  if (isUndefinedNull(dateKey)) {
    throw new Error(
      "UpdateDateColumnRenderer is a function that requires a date property key option. It returns a react class. e.g. UpdateDateColumnRenderer({dateKey: 'string' })",
    )
  }
  return class extends Component {
    static propTypes = {
      value: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      record: PropTypes.object,
    }

    state = {}

    render() {
      const { value, record } = this.props

      if (isUndefinedNull(value)) {
        return <EmptyCellRenderer />
      }

      const date = _.get(record, dateKey)

      if (isUndefinedNull(date)) {
        return value
      }

      return (
        <Tooltip
          content={
            <div>
              Update Date: <DateFormatter value={date} />
            </div>
          }
        >
          <span>{value}</span>
        </Tooltip>
      )
    }
  }
}

export default UpdateDateColumnRenderer
