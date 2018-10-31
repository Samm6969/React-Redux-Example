import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import { CommentField } from '../fields'

class CommentTextField extends Component {
  static propTypes = {
    name: PropTypes.string,
  }

  render() {
    const { ...rest } = this.props
    return <Field {...rest} component={CommentField} />
  }
}

export default CommentTextField
