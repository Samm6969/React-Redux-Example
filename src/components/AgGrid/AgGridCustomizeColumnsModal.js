import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardTitle,
} from '@fc/react-playbook'

import s from './AgGridCustomizeColumnsModal.scss'
// import { Menu, MenuItem } from '../Menu'
import AgGridCustomizeColumns from './AgGridCustomizeColumns'
// import { idSymbol } from './gridUtils'
// import Checkbox from '../Checkbox'
// import PropTypes from 'prop-types'

class AgGridCustomizeColumnsModal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  }

  render() {
    const { open, onClose } = this.props
    return (
      <Modal open={open} onClose={onClose} className={s.modal}>
        <ModalHeader>
          <CardTitle>Customize Columns</CardTitle>
        </ModalHeader>
        <ModalBody className={s.body}>
          <AgGridCustomizeColumns />
        </ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    )
  }
}

export default AgGridCustomizeColumnsModal
