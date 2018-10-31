import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@fc/react-playbook'
import s from './ValueField.scss'

class CurrencyValueFieldRenderer extends Component {
  static propTypes = {
    renderer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    value: PropTypes.string,
  }

  render() {
    const { renderer, ...props } = this.props

    const displayValue =
      typeof renderer === 'function' ? renderer(props) : `$${props.value}`

    return (
      <Tooltip content={displayValue}>
        <div className={s.value}>{displayValue}</div>
      </Tooltip>
    )
  }
}

export default CurrencyValueFieldRenderer
