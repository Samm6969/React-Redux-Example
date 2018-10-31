import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AlertBanner } from '@fc/react-playbook'

class MMFOrderEntryFormErrorField extends Component {
  static propTypes = {
    meta: PropTypes.shape({
      error: PropTypes.arrayOf(
        PropTypes.shape({
          errorCode: PropTypes.string,
          errorText: PropTypes.string,
        }),
      ),
    }),
  }

  render() {
    const { meta } = this.props
    if (!meta.error) {
      return null
    }
    return (
      <div
        style={{
          marginTop: 6,
        }}
      >
        {meta.error.map(({ errorCode, errorText }) => (
          <AlertBanner
            key={errorCode}
            type="warning"
            message={errorText}
            show
            inline
          />
        ))}
      </div>
    )
  }
}

export default MMFOrderEntryFormErrorField
