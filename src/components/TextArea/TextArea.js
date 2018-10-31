import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import s from './TextArea.scss'

class TextArea extends Component {
  static propTypes = {
    error: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { meta, className, ...rest } = this.props
    return <textarea {...rest} className={cx(className, s.input)} />
  }
}

export default TextArea
