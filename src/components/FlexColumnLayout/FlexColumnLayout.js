import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import s from './FlexColumnLayout.scss'

class FlexColumnLayout extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const { className } = this.props
    return <div {...this.props} className={cx(s.container, className)} />
  }
}

export default FlexColumnLayout
