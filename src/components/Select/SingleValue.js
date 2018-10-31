import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { components } from 'react-select'

const { SingleValue: ReactSelectSingleValue } = components

class SingleValue extends Component {
  static propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.shape({
      selectValueDisplay: PropTypes.func,
    }),
  }

  render() {
    const { children, selectProps, ...rest } = this.props
    const { selectValueDisplay } = selectProps

    if (typeof selectValueDisplay === 'function') {
      return (
        <ReactSelectSingleValue {...rest} selectProps={selectProps}>
          {selectValueDisplay(selectProps.value)}
        </ReactSelectSingleValue>
      )
    }

    return (
      <ReactSelectSingleValue {...rest} selectProps={selectProps}>
        {children}
      </ReactSelectSingleValue>
    )
  }
}

export default SingleValue
