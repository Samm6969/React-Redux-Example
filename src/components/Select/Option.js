import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { components as reactSelectComponents } from 'react-select'

// import s from './Option.scss'

const { Option: ReactSelectOption } = reactSelectComponents

class Option extends Component {
  static propTypes = {
    label: PropTypes.node,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { label, children, ...rest } = this.props

    return (
      <ReactSelectOption
        {...rest}
        title={typeof label === 'string' ? label : undefined}
      >
        <div title={typeof label === 'string' ? label : undefined}>
          {children}
        </div>
      </ReactSelectOption>
    )
  }
}

export default Option
