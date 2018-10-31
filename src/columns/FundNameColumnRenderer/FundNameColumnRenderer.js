import React, { Component, Fragment } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@fc/react-playbook'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import FundDetails from '../../containers/FundDetails'
import EmptyCellRenderer from '../EmptyCellRenderer'
import { isUndefinedNull } from '../../utils/utils'

class FundNameColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.string,
    record: PropTypes.shape({
      fund: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }

  state = {
    isModalOpen: false,
  }

  handleModal = e => {
    const { isModalOpen } = this.state
    this.setState({ isModalOpen: !isModalOpen })
    if (e) {
      e.preventDefault()
    }
  }

  render() {
    const { value, record } = this.props
    const { isModalOpen } = this.state

    if (isUndefinedNull(value)) {
      return <EmptyCellRenderer />
    }

    const { fund } = record
    const { id } = fund

    return (
      <Fragment>
        <Link onClick={this.handleModal} to={`/fund-details/${id}`}>
          {value}
        </Link>
        <Modal open={isModalOpen} onClose={this.handleModal}>
          <ModalHeader>Fund Details | {value}</ModalHeader>
          <ModalBody>
            <FundDetails variables={{ id }} />
          </ModalBody>
          <ModalFooter>Fund Details</ModalFooter>
        </Modal>
      </Fragment>
    )
  }
}

export default FundNameColumnRenderer
