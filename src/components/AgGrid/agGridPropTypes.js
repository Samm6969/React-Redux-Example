import PropTypes from 'prop-types'

const columnShape = {
  id: PropTypes.string,
  text(props, propName, componentName) {
    if (typeof props.xtype === 'string' && props.xtype !== 'column') {
      return PropTypes.checkPropTypes(
        { text: PropTypes.node },
        props,
        propName,
        componentName,
      )
    }
    return PropTypes.checkPropTypes(
      { text: PropTypes.node.isRequired },
      props,
      propName,
      componentName,
    )
  },
  dataIndex(props, propName, componentName) {
    if (
      (typeof props.xtype === 'string' && props.xtype !== 'column') ||
      typeof props.children !== 'undefined'
    ) {
      return PropTypes.checkPropTypes(
        { dataIndex: PropTypes.string },
        props,
        propName,
        componentName,
      )
    }
    return PropTypes.checkPropTypes(
      { dataIndex: PropTypes.string.isRequired },
      props,
      propName,
      componentName,
    )
  },
  xtype: PropTypes.oneOf(['column', 'checkcolumn']),
  renderer: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  hidden: PropTypes.bool,
  hideable: PropTypes.bool,
  width: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  locked: PropTypes.bool,
  groupable: PropTypes.bool,
  isGroup: PropTypes.bool,
}

const agGridColumnShape = {
  ...columnShape,
  headerName: PropTypes.string,
  field: PropTypes.string,
  cellRendererFramework: PropTypes.func,
}

agGridColumnShape.children = PropTypes.arrayOf(
  PropTypes.shape(agGridColumnShape),
)

export { agGridColumnShape }

export const columnPropType = PropTypes.shape(agGridColumnShape)

export const columnsPropType = PropTypes.arrayOf(columnPropType)
