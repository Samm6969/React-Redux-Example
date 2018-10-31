import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import s from './ValueField.scss'
import formGroup from '../../hoc/formGroup'

@formGroup
class ValueField extends Component {
  static propTypes = {
    renderer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    // eslint-disable-next-line
    value: PropTypes.any,
    className: PropTypes.string,
    emptyCellText: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    record: PropTypes.any,
  }

  static defaultProps = {
    emptyCellText: '--',
  }

  render() {
    const { renderer: Renderer, value, className, record, ...rest } = this.props
    return typeof Renderer === 'function' ? (
      <Renderer
        {...rest}
        className={cx(className, s.value)}
        value={value}
        record={record}
      />
    ) : (
      <div className={cx(className, s.value)}>{value}</div>
    )
  }
}

export default ValueField
