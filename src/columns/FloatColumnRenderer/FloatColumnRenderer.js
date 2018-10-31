import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Tooltip } from '@fc/react-playbook'

import EmptyCellRenderer from '../EmptyCellRenderer'
import NumberFormatter from '../../components/NumberFormatter'
import s from './FloatColumnRenderer.scss'
import { isUndefinedNull } from '../../utils/utils'

class FloatColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.node,
    className: PropTypes.string,
    isStale: PropTypes.bool,
    tooltipContent: PropTypes.node,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const {
      value,
      className: classNameProp,
      isStale,
      tooltipContent,
    } = this.props

    const className = cx(s.wrapper, classNameProp, {
      [s.stale]: isStale,
    })

    const isEmpty = !Number(value) || isUndefinedNull(value)

    if (isEmpty) {
      return <EmptyCellRenderer isEmpty={isEmpty} />
    }

    if (tooltipContent) {
      return (
        <div className={className}>
          <Tooltip content={tooltipContent}>
            <span>
              <NumberFormatter value={value} />
            </span>
          </Tooltip>
        </div>
      )
    }

    return <NumberFormatter value={value} />
  }
}

export default FloatColumnRenderer
