import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import s from './FundHolidayRenderer.scss'

class FundHolidayRenderer extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const { className, ...rest } = this.props

    return (
      <span className={cx(s.closed, className)} {...rest}>
        Closed
      </span>
    )
  }
}

export default FundHolidayRenderer
