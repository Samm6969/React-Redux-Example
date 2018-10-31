import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { withGridContext } from '@fc/react-playbook'

const TreeNameRenderer = props => {
  const { record, groupBy } = props
  const { parent, child } = groupBy
  const { renderPath, renderer } = record.isParent ? parent : child
  const value = _.get(record, renderPath)

  if (!record.isParent) return <div />

  return renderer ? (
    <div>{renderer({ ...props, value })}</div>
  ) : (
    <div>{value}</div>
  )
}

TreeNameRenderer.propTypes = {
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  groupBy: PropTypes.shape({
    parent: PropTypes.shape({
      renderPath: PropTypes.string.isRequired,
      renderer: PropTypes.func,
    }).isRequired,
    child: PropTypes.shape({
      renderPath: PropTypes.string.isRequired,
      renderer: PropTypes.func,
    }).isRequired,
  }),
}

export default withGridContext(['groupBy'])(TreeNameRenderer)
