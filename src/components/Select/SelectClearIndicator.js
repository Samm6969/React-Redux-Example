import React, { Component } from 'react'
import { components as reactSelectComponents } from 'react-select'
import { Icon } from '@fc/react-playbook'

import s from './SelectClearIndicator.scss'

const { ClearIndicator } = reactSelectComponents

class SelectClearIndicator extends Component {
  render() {
    return (
      <ClearIndicator {...this.props}>
        <Icon name="material-close" className={s.clear} />
      </ClearIndicator>
    )
  }
}

export default SelectClearIndicator
