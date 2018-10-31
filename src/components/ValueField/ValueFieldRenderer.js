import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@fc/react-playbook'

import s from './ValueFieldRenderer.scss'

class ValueFieldRenderer extends Component {
  static propTypes = {
    renderer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    value: PropTypes.string,
  }

  render() {
    const { renderer, ...props } = this.props
    return typeof renderer === 'function' ? (
      renderer(props)
    ) : (
      <Tooltip content={props.value}>
        <div className={s.value}>{props.value}</div>
      </Tooltip>
    )
  }
}

export default ValueFieldRenderer
