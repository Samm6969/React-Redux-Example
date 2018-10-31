import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import s from './MenuItem.scss'
// import { MenuConsumer } from './MenuContext'

class MenuItem extends Component {
  static displayName = 'MenuItem'

  static propTypes = {
    children: PropTypes.node.isRequired,
    closeOnSelect: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    onMouseOver: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    forMenu: PropTypes.string,
    className: PropTypes.string,
    setActiveMenuItem: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    activeMenuItem: PropTypes.object,
  }

  static defaultProps = {
    closeOnSelect: true,
  }

  constructor(props) {
    super(props)
    this.menuItem = React.createRef()
  }

  handleClose = () => {
    const { onClose, closeOnSelect, forMenu } = this.props
    if (
      typeof onClose === 'function' &&
      closeOnSelect &&
      typeof forMenu === 'undefined'
    ) {
      onClose()
    }
  }

  handleSelection = e => {
    const { onSelect } = this.props
    if (typeof onSelect === 'function') {
      onSelect(e)
    }
    this.handleClose()
  }

  handleClick = e => {
    this.handleSelection(e)
  }

  onMouseOver = (...args) => {
    const { onMouseOver } = this.props
    if (typeof onMouseOver === 'function') {
      onMouseOver(...args)
    }

    const [e] = args
    e.target.focus()
  }

  onFocus = (...args) => {
    const { onFocus, setActiveMenuItem, forMenu } = this.props
    if (typeof onFocus === 'function') {
      onFocus(...args)
    }

    if (typeof setActiveMenuItem === 'function') {
      const [e] = args
      setActiveMenuItem(e.target, forMenu)
    }
  }

  onKeyDown = (...args) => {
    const { onKeyDown } = this.props
    if (typeof onKeyDown === 'function') {
      onKeyDown(...args)
    }
    const [e] = args
    switch (e.key) {
      case 'Enter':
        this.handleSelection(e)
        break
      case ' ':
        this.handleSelection(e)
        break
      default:
        break
    }
  }

  render() {
    const {
      closeOnSelect,
      onClose,
      onSelect,
      forMenu,
      children,
      innerRef,
      onMouseOver,
      className,
      setActiveMenuItem,
      activeMenuItem,
      ...rest
    } = this.props

    let inFocus = false

    if (typeof activeMenuItem !== 'undefined' && this.menuItem.current) {
      inFocus = activeMenuItem === this.menuItem.current
    }

    const classes = cx(className, s.item, { [s.focus]: inFocus })

    return (
      <div
        tabIndex={0}
        ref={this.menuItem}
        className={classes}
        onClick={this.handleClick}
        onMouseOver={this.onMouseOver}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
        {...rest}
      >
        {children}
      </div>
    )
  }
}

export default MenuItem
