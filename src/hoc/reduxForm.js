import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm as reactReduxForm, change as changeAction } from 'redux-form'
import { connect } from 'react-redux'

export const {
  Provider: ReduxFormProvider,
  Consumer: ReduxFormConsumer,
} = React.createContext({})

const mapDispatchToProps = dispatch => ({
  setFormValue: (...args) => dispatch(changeAction(...args)),
})

const reduxForm = options => WrappedComponent => {
  const ReduxFormComponent = reactReduxForm({
    ...options,
  })(WrappedComponent)

  @connect(
    null,
    mapDispatchToProps,
  )
  class ReduxForm extends Component {
    static propTypes = {
      setFormValue: PropTypes.func.isRequired,
    }

    setInitialValue = (member, value) => {
      const { setFormValue, form } = this.props
      const formName = form || options.form

      setFormValue(formName, member, value)
    }

    render() {
      return (
        <ReduxFormProvider
          value={{
            setInitialValue: this.setInitialValue,
          }}
        >
          <ReduxFormComponent {...this.props} />
        </ReduxFormProvider>
      )
    }
  }

  return ReduxForm
}

export default reduxForm
