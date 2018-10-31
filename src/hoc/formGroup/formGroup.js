import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import _ from 'lodash'
import getDisplayName from '@fc/react-playbook/src/utils/getDisplayName'

import s from './formGroup.scss'
import { ReduxFormConsumer } from '../reduxForm'

const formGroup = WrappedComponent => {
  class FormGroupComponent extends PureComponent {
    static displayName = getDisplayName('formGroup', WrappedComponent)

    static propTypes = {
      // eslint-disable-next-line react/forbid-foreign-prop-types
      ...WrappedComponent.propTypes,
      label: PropTypes.node,
      // eslint-disable-next-line react/forbid-prop-types
      input: PropTypes.object,
      // eslint-disable-next-line react/forbid-prop-types
      meta: PropTypes.object,
      inline: PropTypes.bool,
      disabled: PropTypes.bool,
      className: PropTypes.string,
      formGroupClassName: PropTypes.string,
      formGroupLabelClassName: PropTypes.string,
      delimiter: PropTypes.string,
      showDelimiter: PropTypes.bool,
      fieldArrayMetaError: PropTypes.string,
      showUntouchedErrors: PropTypes.bool,
      showUntouchedWarnings: PropTypes.bool,
      setInitialValue: PropTypes.func,
      align: PropTypes.oneOf(['left', 'center', 'right']),
    }

    static defaultProps = {
      className: '',
      formGroupClassName: '',
      formGroupLabelClassName: '',
      delimiter: ':',
      input: {},
      meta: {},
    }

    componentDidMount() {
      const { input, setInitialValue, defaultValue, meta } = this.props
      const { name } = input

      if (
        meta.pristine &&
        !_.isEmpty(defaultValue) &&
        typeof setInitialValue === 'function'
      ) {
        setInitialValue(name, defaultValue)
      }
    }

    get id() {
      const { input, meta, id } = this.props
      const { name } = input
      const { form } = meta

      if (id) {
        return id
      }

      if (!form && !name) {
        return undefined
      }

      return _.kebabCase(`${form}-${name}`)
    }

    render() {
      const {
        label,
        input,
        meta,
        inline,
        className,
        formGroupClassName,
        formGroupLabelClassName,
        showDelimiter: showDelimiterProp,
        delimiter,
        setInitialValue,
        align,
        showUntouchedErrors,
        fieldArrayMetaError,
        showUntouchedWarnings,
        disabled,
        ...props
      } = this.props

      let showDelimiter = showDelimiterProp
      if (inline && typeof showDelimiterProp === 'undefined') {
        showDelimiter = true
      }

      const { id } = this

      const textAlignClassNames = cx({
        [s.leftAlign]: align === 'left',
        [s.rightAlign]: align === 'right',
        [s.centerAlign]: align === 'center',
      })

      return (
        <div
          className={cx(formGroupClassName, s.wrapper, {
            [s.inline]: inline,
          })}
        >
          {label && (
            <label
              htmlFor={id}
              className={cx(
                formGroupLabelClassName,
                s.label,
                textAlignClassNames,
                { [s.disabled]: disabled },
              )}
            >
              {label}
              {showDelimiter && delimiter}
            </label>
          )}
          <WrappedComponent
            id={id}
            {...props}
            {...input}
            disabled={disabled}
            meta={meta}
            className={cx(className, s.field, textAlignClassNames)}
          />
          <div className={cx(s.errorMessages, textAlignClassNames)}>
            {((meta.touched && !meta.active && meta.error) ||
              showUntouchedErrors) && (
              <span className={s.error}>{meta.error}</span>
            )}
          </div>
          <div className={cx(s.errorMessages, textAlignClassNames)}>
            {((meta.touched && !meta.active && fieldArrayMetaError) ||
              showUntouchedErrors) && (
              <span className={s.error}>{fieldArrayMetaError}</span>
            )}
          </div>
          <div className={cx(s.errorMessages, textAlignClassNames)}>
            {((meta.touched && !meta.active && meta.warning) ||
              showUntouchedWarnings) && (
              <span className={s.warning}>{meta.warning}</span>
            )}
          </div>
        </div>
      )
    }
  }
  return props => (
    <ReduxFormConsumer>
      {({ setInitialValue }) => (
        <FormGroupComponent {...props} setInitialValue={setInitialValue} />
      )}
    </ReduxFormConsumer>
  )
}

export default formGroup
