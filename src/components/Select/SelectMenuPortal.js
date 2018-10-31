import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { components as reactSelectComponents } from 'react-select'

const { MenuPortal } = reactSelectComponents

class SelectMenuPortal extends Component {
  static propTypes = {
    getStyles: PropTypes.func,
  }

  render() {
    const { getStyles, ...rest } = this.props
    return (
      <MenuPortal
        {...rest}
        getStyles={(name, state) => ({
          ...getStyles(name, state),
          zIndex: 1000,
        })}
      />
    )
  }
}

export default SelectMenuPortal
