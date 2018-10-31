import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import Input from '../Input'

class NumberInput extends Component {
  static propTypes = {
    thousandSeparator: PropTypes.bool,
  }

  static defaultProps = {
    thousandSeparator: true,
  }

  render() {
    return <NumberFormat {...this.props} customInput={Input} />
  }
}

export default NumberInput
