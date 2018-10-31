import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { columnShape } from './gridPropTypes'
import GridCell from './GridCell'
// import cx from 'classnames'
// import s from './GridHeader.scss'
import { CheckColumnConsumer } from './CheckColumnContext'
import CheckColumn from './CheckColumn'
import GridHeaderGroup from './GridHeaderGroup'

class GridHeaderColumnBuilder extends Component {
  static propTypes = {
    /**
     * Row height
     */
    rowHeight: PropTypes.number.isRequired,
    ...columnShape,
  }

  render() {
    const {
      id,
      text,
      width,
      hidden,
      hideable,
      flex,
      minWidth,
      maxWidth,
      isGroup,
      // isFirstColumnInGroup,
      xtype,
      rowHeight,
      textAlign,
      // path,
    } = this.props

    // console.log(id, this.props)

    if (hidden && hideable) {
      return null
    }

    if (isGroup) {
      return <GridHeaderGroup {...this.props} />
    }

    return (
      <GridCell
        id={id}
        key={id}
        isHeader
        isCheckColumn={xtype === 'checkcolumn'}
        style={{
          width,
          flex: typeof width === 'undefined' ? `${flex} 1 auto` : null,
          minWidth: width || minWidth,
          maxWidth: width || maxWidth,
          minHeight: rowHeight,
        }}
        textAlign={textAlign}
      >
        {xtype === 'column' && text}
        {xtype === 'checkcolumn' && (
          <CheckColumnConsumer>
            {props => <CheckColumn isHeader {...props} column={this.props} />}
          </CheckColumnConsumer>
        )}
      </GridCell>
    )
  }
}

export default GridHeaderColumnBuilder
