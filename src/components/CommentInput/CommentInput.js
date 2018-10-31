import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Icon,
  Tooltip,
} from '@fc/react-playbook'
import TextArea from '../TextArea'

import s from './CommentInput.scss'

class CommentInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
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
      value,
    }
  }

  state = {
    openModal: false,
  }

  handleOnChange = event => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { ...props } = this.props
    const { openModal, value, initialValue } = this.state
    return (
      <div className={s.comment}>
        <Tooltip content={initialValue} disabled={initialValue.length <= 0}>
          <a
            onClick={() => {
              this.setState({ openModal: true })
            }}
          >
            {!initialValue && 'Add Comment...'}
            {initialValue}
            <Icon name="material-edit" className={s.icon} />
          </a>
        </Tooltip>

        <Modal
          open={openModal}
          onClose={() => {
            this.setState({ openModal: false })
          }}
          className={s.modal}
        >
          <ModalHeader>Comment</ModalHeader>
          <ModalBody>
            <TextArea
              {...props}
              value={value}
              onChange={this.handleOnChange}
              wrap="hard"
              rows="2"
              cols="20"
              className={s.commentInput}
              placeholder=" Add comment here... limited to 160 characters"
            />
          </ModalBody>
          <ModalFooter className={s.modalFooter}>
            <Button
              onClick={() => {
                this.setState({ openModal: false })
              }}
            >
              Cancel
            </Button>
            <Button
              primary
              onClick={() => {
                this.setState({ openModal: false, initialValue: value })
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

export default CommentInput
