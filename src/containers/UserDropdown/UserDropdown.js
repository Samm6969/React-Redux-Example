import React, { Component, Fragment } from 'react'
import { AccountDropdown, MenuItem } from '@fc/react-playbook'
import Logout from '../../utils/Logout'
import UserSettings from '../UserSettings'

export default class UserDropdown extends Component {
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
    const { isModalOpen } = this.state
    return (
      <Fragment>
        <AccountDropdown
          appName={process.env.APP_NAME}
          appUri={process.env.APP_URI}
          onLogout={Logout}
        >
          <MenuItem onClick={this.handleModal}>User Settings</MenuItem>
        </AccountDropdown>
        <UserSettings open={isModalOpen} onClose={this.handleModal} />
      </Fragment>
    )
  }
}
