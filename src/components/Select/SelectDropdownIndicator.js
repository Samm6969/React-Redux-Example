import React, { Component } from 'react'
import { components as reactSelectComponents } from 'react-select'
import { Icon } from '@fc/react-playbook'

import s from './SelectDropdownIndicator.scss'

const { DropdownIndicator } = reactSelectComponents

class SelectDropdownIndicator extends Component {
  render() {
    return (
      <DropdownIndicator {...this.props}>
        <Icon name="material-caret" className={s.caret} />
      </DropdownIndicator>
    )
  }
}

export default SelectDropdownIndicator
