import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import withReduxFormContext from '../../hoc/withReduxFormContext'

const mapStateToProps = (state, { name, section }) => ({
  value: formValueSelector(section.form)(state, name),
})

@withReduxFormContext
@connect(mapStateToProps)
class FormValueSelector extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
  }

  static contextTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    _reduxForm: PropTypes.object,
  }

  render() {
    // console.log(this.context)
    const { children, value } = this.props
    if (typeof children !== 'function') {
      return null
    }
    return children(value)
  }
}

export default FormValueSelector
