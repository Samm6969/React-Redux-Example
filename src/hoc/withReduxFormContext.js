import React, { Component } from 'react'
import getDisplayName from '@fc/react-playbook/src/utils/getDisplayName'
import PropTypes from 'prop-types'

const withReduxFormContext = WrappedComponent =>
  class WithReduxFormContext extends Component {
    static displayName = getDisplayName('WithButtonStyles', WrappedComponent)

    static propTypes = {
      ...(WrappedComponent.propTypes || {}),
    }

    static contextTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      _reduxForm: PropTypes.object,
    }

    render() {
      const { _reduxForm } = this.context
      return <WrappedComponent section={_reduxForm} {...this.props} />
    }
  }

export default withReduxFormContext
