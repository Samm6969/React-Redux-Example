import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Tooltip } from '@fc/react-playbook'

import s from './NumberColumnRenderer.scss'
import { isUndefinedNull } from '../../utils/utils'
import EmptyCellRenderer from '../EmptyCellRenderer'
import NumberFormatter from '../../components/NumberFormatter'

class NumberColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.node,
    className: PropTypes.string,
    isStale: PropTypes.bool,
    handleNegativeValues: PropTypes.bool,
    tooltipContent: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.object,
    formatter: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    handleNegativeValues: true,
  }

  handleNegativeValues = value => {
    const { options, handleNegativeValues, formatter } = this.props
    if (handleNegativeValues && value < 0) {
      return (
        <Fragment>
          (
          <NumberFormatter
            value={value * -1}
            options={options}
            formatter={formatter}
          />
          )
        </Fragment>
      )
    }

    return (
      <NumberFormatter value={value} options={options} formatter={formatter} />
    )
  }

  render() {
    const {
      value,
      className: classNameProp,
      isStale,
      tooltipContent,
    } = this.props

    const className = cx(classNameProp, {
      [s.stale]: isStale,
    })

    const isEmpty = !Number(value) || isUndefinedNull(value)

    if (isEmpty) {
      return <EmptyCellRenderer isEmpty={isEmpty} />
    }

    if (tooltipContent) {
      return (
        <Tooltip content={tooltipContent}>
          <span className={className}>{this.handleNegativeValues(value)}</span>
        </Tooltip>
      )
    }

    return <span className={className}>{this.handleNegativeValues(value)}</span>
  }
}

export default NumberColumnRenderer
