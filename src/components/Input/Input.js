import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import s from './Input.scss'

class Input extends Component {
  static propTypes = {
    error: PropTypes.bool,
    className: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { meta, className, type, ...rest } = this.props

    const conditionalClassNames = {
      [s.text]: type === 'text',
    }

    return (
      <input
        {...rest}
        className={cx(className, s.input, conditionalClassNames)}
        type={type}
      />
    )
  }
}

export default Input
