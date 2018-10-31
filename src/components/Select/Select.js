import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import cx from 'classnames'

import s from './Select.scss'
import DropdownIndicator from './SelectDropdownIndicator'
import ClearIndicator from './SelectClearIndicator'
import MenuPortal from './SelectMenuPortal'
import Option from './Option'
import SingleValue from './SingleValue'

class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    onBlur: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    isDisabled: PropTypes.bool,
    meta: PropTypes.shape({
      form: PropTypes.string,
    }),
    id: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    meta: {},
  }

  /**
   * Fix an issue where redux-forms clears the value on blur
   * https://github.com/erikras/redux-form/issues/82#issuecomment-274047138
   */
  onBlur = e => {
    const { value, onBlur, meta } = this.props
    if (typeof onBlur === 'function') {
      // is a component used by redux-forms
      if (meta.form) {
        onBlur(value, e)
      } else {
        onBlur(e)
      }
    }
  }

  render() {
    const {
      className,
      disabled,
      isDisabled,
      placeholder,
      id,
      ...props
    } = this.props

    const inputId = typeof id === 'undefined' ? undefined : `${id}-input`
    const SelectComp = (
      <ReactSelect
        inputId={inputId}
        classNamePrefix="fc"
        components={{
          DropdownIndicator,
          ClearIndicator,
          MenuPortal,
          Option,
          SingleValue,
        }}
        isDisabled={disabled || isDisabled}
        placeholder={disabled || isDisabled ? '' : placeholder}
        {...props}
        onBlur={this.onBlur}
        className={cx(className, s.select)}
      />
    )

    if (typeof document !== 'undefined') {
      return cloneElement(SelectComp, {
        menuPortalTarget: document.body,
      })
    }

    return SelectComp
  }
}

export default Select
