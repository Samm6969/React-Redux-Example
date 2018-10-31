import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TableOfContentsProvider } from './TableOfContentsContext'

class TableOfContentsContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  render() {
    const { id, ...rest } = this.props
    return (
      <TableOfContentsProvider value={{ id }}>
        <div id={id} {...rest} />
      </TableOfContentsProvider>
    )
  }
}

export default TableOfContentsContainer
