import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Icon,
} from '@fc/react-playbook'

class ModalField extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.node,
    onChange: PropTypes.func,
    ValueRenderer: PropTypes.node,
    ModalForm: PropTypes.node.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  constructor(props) {
    super(props)
    const { value } = props
    this.state = {
      openModal: false,
      initialValue: value,
      setValue: value,
      value,
    }
  }

  state = {
    openModal: false,
  }

  static getDerivedStateFromProps({ value }) {
    return { value }
  }

  render() {
    const { placeholder, ValueRenderer, ModalForm, ...props } = this.props
    const { openModal, value, setValue, initialValue } = this.state

    return (
      <div>
        <a
          onClick={() => {
            this.setState({ openModal: true })
          }}
        >
          {!setValue && placeholder}
          {ValueRenderer ? <ValueRenderer setValue={setValue} /> : setValue}
          <Icon name="material-edit" />
        </a>

        <Modal
          open={openModal}
          onClose={() => {
            this.setState({ openModal: false })
          }}
        >
          <ModalHeader>Comment</ModalHeader>
          <ModalBody>{<ModalForm {...props} />}</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.setState(
                  {
                    openModal: false,
                    value: initialValue,
                    setValue: initialValue,
                  },
                  () => {
                    const { onChange } = this.props
                    if (typeof onChange === 'function') {
                      onChange(initialValue)
                    }
                  },
                )
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                this.setState({ openModal: false, value: setValue })
              }}
            >
              Cancel
            </Button>
            <Button
              primary
              onClick={() => {
                this.setState({ openModal: false, setValue: value })
              }}
            >
              Set
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ModalField
