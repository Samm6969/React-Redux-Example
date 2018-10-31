import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@fc/react-playbook'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

import UserSettingsForm from '../UserSettingsForm'
import s from './UserSettings.scss'
import { updateUserSettingsAction } from './userSettingsActions'

const form = 'userSettings'

const mapStateToProps = state => ({
  initialSettings: state.settings,
})

const mapDispatchToProps = dispatch => ({
  updateUserSettings: settings => {
    dispatch(updateUserSettingsAction(settings))
  },
  submitForm: () => {
    dispatch(submit(form))
  },
})

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class UserSettings extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    initialSettings: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    updateUserSettings: PropTypes.func.isRequired,
    open: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.formNode = React.createRef()
  }

  onSave = e => {
    const { submitForm } = this.props
    submitForm()
    if (e) {
      e.preventDefault()
    }
  }

  onSubmit = values => {
    const { onClose, updateUserSettings } = this.props
    updateUserSettings(values)
    onClose()
  }

  render() {
    const { open, onClose, initialSettings } = this.props

    return (
      <Modal open={open} onClose={onClose} className={s.modal}>
        <ModalHeader>Settings</ModalHeader>
        <ModalBody>
          <UserSettingsForm
            form={form}
            ref={this.formNode}
            initialValues={initialSettings}
            onSubmit={this.onSubmit}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={this.onSave} primary>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default UserSettings
