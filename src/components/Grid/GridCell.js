import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import s from './GridCell.scss'

class GridCell extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    innerCellProps: PropTypes.shape({
      className: PropTypes.string,
    }),
    isHeader: PropTypes.bool,
    isGroup: PropTypes.bool,
    isOddRow: PropTypes.bool,
    isCheckColumn: PropTypes.bool,
    isHovering: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
    // setColumnWidth: PropTypes.func,
  }

  static defaultProps = {
    innerCellProps: {
      className: '',
    },
    textAlign: 'left',
  }

  constructor(props) {
    super(props)
    this.node = React.createRef()
  }

  // componentDidMount() {
  //   this.updateWidth()
  // }
  //
  // componentDidUpdate() {
  //   this.updateWidth()
  // }
  //
  // updateWidth = () => {
  //   const { isHeader, setColumnWidth, id } = this.props
  //
  //   if (isHeader && this.node.current && typeof setColumnWidth === 'function') {
  //     setTimeout(() => {
  //       console.log(id, this.node.current.offsetWidth)
  //       setColumnWidth(id, this.node.current.offsetWidth)
  //     })
  //   }
  // }

  render() {
    const {
      children,
      className,
      innerCellProps,
      isHeader,
      isGroup,
      isOddRow,
      isCheckColumn,
      isHovering,
      style,
      textAlign,
      isScrolling,
      // setColumnWidth,
      ...rest
    } = this.props
    const { className: innerClassName, ...restInner } = innerCellProps

    const cellClassName = cx(s.cell, className, {
      [s.isHeader]: isHeader,
      [s.isGroup]: isGroup,
      [s.isOddRow]: isOddRow,
      [s.isCheckColumn]: isCheckColumn,
      [s.isHovering]: isHovering,
    })
    const innerCellClassName = cx(s.innerCell, innerClassName)
    return (
      <div
        className={cellClassName}
        style={{ ...style, textAlign }}
        {...rest}
        ref={this.node}
      >
        <div className={innerCellClassName} {...restInner}>
          {children}
        </div>
      </div>
    )
  }
}

export default GridCell
