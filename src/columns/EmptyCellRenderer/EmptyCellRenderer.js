import { Component } from 'react'
import PropTypes from 'prop-types'

class EmptyCellRenderer extends Component {
  static propTypes = {
    emptyCellText: PropTypes.node,
  }

  static defaultProps = {
    emptyCellText: '--',
  }

  render() {
    const { emptyCellText } = this.props
    return emptyCellText
  }
}

export default EmptyCellRenderer
