import React, { Component } from 'react'
import cx from 'classnames'
import _ from 'lodash'
// import PropTypes from 'prop-types'

import s from './AgGridCustomizeColumns.scss'
import { AgGridConsumer } from './AgGridContext'
import { forEachTree } from './agGridUtils'
import Checkbox from '../Checkbox'

/**
 * This Customize columns menu assumes the column groups will me no more than one level deep
 */
class AgGridCustomizeColumns extends Component {
  buildColumnSelection = (columns, gridColumnApi) => {
    const items = []

    forEachTree(columns, 'children', (column, index) => {
      const {
        headerName,
        field,
        colId,
        children,
        disableCustomizeColumn,
      } = column
      const isFirstItem = items.length === 0

      const isGroup = Array.isArray(children)
      const id = colId || field

      if (isGroup && !disableCustomizeColumn) {
        const colKeys = []
        _.forEach(children, ({ colId: childColId, field: childField }) => {
          const childId = childColId || childField
          colKeys.push(childId)
        })
        items.push(
          <h4
            key={`group[${index}]`}
            className={cx(s.group, { [s.first]: isFirstItem })}
          >
            {headerName}{' '}
            <div>
              <span
                onClick={() => {
                  gridColumnApi.setColumnsVisible(colKeys, true)
                  this.forceUpdate()
                }}
                className={s.groupToggle}
              >
                Show all
              </span>
              <span
                onClick={() => {
                  gridColumnApi.setColumnsVisible(colKeys, false)
                  this.forceUpdate()
                }}
                className={s.groupToggle}
              >
                Hide all
              </span>
            </div>
          </h4>,
        )
      }

      if (!isGroup && !disableCustomizeColumn) {
        const columnApi = gridColumnApi.getColumn(id)
        const checked = columnApi.isVisible()
        const disabled = columnApi.isLockVisible()
        items.push(
          // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for
          <label key={id} className={s.label}>
            <Checkbox
              id={colId}
              checked={checked}
              onChange={() => {
                if (gridColumnApi) {
                  gridColumnApi.setColumnVisible(id, !checked)
                  this.forceUpdate()
                }
              }}
              className={s.checkbox}
              disabled={disabled}
            />
            {headerName}
          </label>,
        )
      }

      return null
    })

    return items
  }

  render() {
    return (
      <AgGridConsumer>
        {({ columns, gridColumnApi }) => (
          <div className={s.container}>
            <div className={s.section}>
              {this.buildColumnSelection(columns, gridColumnApi)}
            </div>
          </div>
        )}
      </AgGridConsumer>
    )
  }
}

export default AgGridCustomizeColumns
