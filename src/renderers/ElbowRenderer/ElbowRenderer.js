import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withGridContext } from '@fc/react-playbook'

@withGridContext(['groupBy'])
export default class ElbowRenderer extends Component {
  static propTypes = {
    groupBy: PropTypes.shape({
      parent: PropTypes.shape({
        header: PropTypes.string,
      }).isRequired,
      child: PropTypes.shape({
        header: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { groupBy } = this.props
    const { parent } = groupBy

    return <span>{parent.header}</span>
  }
}
