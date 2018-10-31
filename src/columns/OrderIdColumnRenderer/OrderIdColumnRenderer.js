// eslint-disable-next-line no-unused-vars
import React, { Component, Fragment } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@fc/react-playbook'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { isUndefinedNull } from '../../utils/utils'
import EmptyCellRenderer from '../EmptyCellRenderer'

// TODO: Make this open a modal showing details of the order

// import OrderDetails from '../containers/OrderDetails'

class OrderIdColumnRenderer extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    record: PropTypes.shape({
      order: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }

  state = {
    isModalOpen: false,
  }

  handleModal = e => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }))
    if (e) e.preventDefault()
  }

  render() {
    const { value, record } = this.props
    const { isModalOpen } = this.state

    if (isUndefinedNull(value)) {
      return <EmptyCellRenderer />
    }

    const { order } = record
    const { id } = order

    return (
      <Fragment>
        <Link onClick={this.handleModal} to={`/order-details/${id}`}>
          {value}
        </Link>
        <Modal open={isModalOpen} onClose={this.handleModal}>
          <ModalHeader>Order Details | {value}</ModalHeader>
          <ModalBody>
            Not Implemented
            {/* TODO: Implement order details component */}
          </ModalBody>
          <ModalFooter>Order Details</ModalFooter>
        </Modal>
      </Fragment>
    )
  }
}

export default OrderIdColumnRenderer
