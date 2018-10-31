import React, { Component } from 'react'
import cx from 'classnames'
// import PropTypes from 'prop-types'

import s from './GridCustomizeColumns.scss'
import { GridConsumer } from './GridProvider'
import { idSymbol, forEachTree } from './gridUtils'
import Checkbox from '../Checkbox'

class GridCustomizeColumns extends Component {
  buildColumnSelection = (columns, toggleColumn, toggleAllColumnsInGroup) => {
    const items = []
    forEachTree(
      columns,
      'children',
      ({
        xtype,
        isGroup,
        text,
        hidden,
        showInMenu,
        [idSymbol]: id,
        path,
        hideable,
      }) => {
        const isFirstItem = items.length === 0

        if (xtype === 'column' && isGroup && showInMenu) {
          items.push(
            <h4 key={id} className={cx(s.group, { [s.first]: isFirstItem })}>
              {text}{' '}
              <div>
                <span
                  onClick={() => {
                    toggleAllColumnsInGroup(path, false)
                  }}
                  className={s.groupToggle}
                >
                  Show all
                </span>
                <span
                  onClick={() => {
                    toggleAllColumnsInGroup(path, true)
                  }}
                  className={s.groupToggle}
                >
                  Hide all
                </span>
              </div>
            </h4>,
          )
        }

        if (xtype === 'column' && !isGroup && showInMenu) {
          items.push(
            // eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for
            <label key={id} className={s.label}>
              <Checkbox
                id={id}
                checked={!hidden}
                onChange={() => toggleColumn(id)}
                className={s.checkbox}
                disabled={!hideable}
              />
              {text}
            </label>,
          )
        }
      },
    )

    return items
  }

  render() {
    return (
      <GridConsumer>
        {({ initialColumns, toggleColumn, toggleAllColumnsInGroup }) => (
          <div className={s.container}>
            <div className={s.section}>
              {this.buildColumnSelection(
                initialColumns,
                toggleColumn,
                toggleAllColumnsInGroup,
              )}
            </div>
          </div>
        )}
      </GridConsumer>
    )
  }
}

export default GridCustomizeColumns
