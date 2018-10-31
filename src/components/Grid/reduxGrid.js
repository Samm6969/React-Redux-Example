import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { initializeGrid } from './gridActions'
import { getGridProps } from './gridSelectors'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const reduxGrid = options => WrappedComponent => {
  const ConnectedGrid = connect(state => ({
    ...getGridProps(options.id)(state),
  }))(WrappedComponent)

  const mapDispatchToProps = dispatch => ({
    onCreateGrid: (id, initialState) => {
      dispatch(initializeGrid(id, initialState))
    },
  })

  @connect(
    null,
    mapDispatchToProps,
  )
  class ReduxGrid extends Component {
    static propTypes = {
      onCreateGrid: PropTypes.func,
    }

    static displayName = `ReduxGrid(${getDisplayName(WrappedComponent)})`

    constructor(props) {
      super(props)
      const { onCreateGrid } = props
      const { id, columns } = options
      onCreateGrid(id, { columns })
    }

    render() {
      return <ConnectedGrid />
    }
  }

  return ReduxGrid
}

export default reduxGrid
