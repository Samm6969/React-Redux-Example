import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
// import _ from 'lodash'
import { Icon } from '@fc/react-playbook'

import s from './Checkbox.scss'
// import Input from '../Input'

export default class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
  }

  state = {
    isChecked: false,
    inFocus: false,
  }

  static getDerivedStateFromProps(props) {
    const { checked } = props

    if (typeof checked !== 'undefined') {
      return {
        isChecked: checked,
      }
    }

    return null
  }

  onChange = (...args) => {
    const { onChange, checked } = this.props
    if (typeof onChange === 'function') {
      onChange(...args)
    }
    const [e] = args
    if (typeof checked === 'undefined') {
      this.setState({
        isChecked: e.target.checked,
      })
    }
  }

  onFocus = (...args) => {
    const { onFocus } = this.props
    if (typeof onFocus === 'function') {
      onFocus(...args)
    }
    this.setState({
      inFocus: true,
    })
  }

  onBlur = (...args) => {
    const { onBlur } = this.props
    if (typeof onBlur === 'function') {
      onBlur(...args)
    }
    this.setState({
      inFocus: false,
    })
  }

  onClick = (...args) => {
    const { onClick } = this.props
    if (typeof onClick === 'function') {
      onClick(...args)
    }
    const [e] = args
    e.target.blur()
  }

  render() {
    const { meta, className, disabled, checked, ...props } = this.props
    const { isChecked, inFocus } = this.state

    return (
      <div
        className={cx(s.checkbox, className, {
          [s.checked]: isChecked,
          [s.focus]: inFocus,
          [s.disabled]: disabled,
        })}
        tabIndex={null}
        title={disabled ? 'Disabled' : undefined}
      >
        {isChecked && <Icon name="check" className={s.check} />}
        <input
          type="checkbox"
          className={cx(s.input)}
          {...props}
          disabled={disabled}
          checked={checked}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onClick={this.onClick}
        />
      </div>
    )
  }
}
