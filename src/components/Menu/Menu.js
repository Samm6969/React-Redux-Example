import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import s from './Menu.scss'
import Popper from '../Popper/Popper'
import MenuItem from './MenuItem'
import MenuSpacer from './MenuSpacer'
import { MenuProvider } from './MenuContext'

class Menu extends Component {
  static displayName = 'Menu'

  static propTypes = {
    id: PropTypes.string,
    open: PropTypes.bool,
    anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    onClose: PropTypes.func,
    children: PropTypes.node,
    disablePortal: PropTypes.bool,
    placement: Popper.propTypes.placement,
    isSubMenu: PropTypes.bool,
  }

  static defaultProps = {
    disablePortal: false,
    placement: 'bottom-end',
    isSubMenu: false,
  }

  nodes = {}

  state = {
    activeMenuItem: null,
    subMenuId: null,
  }

  constructor(props) {
    super(props)
    this.menu = React.createRef()
  }

  componentDidMount() {
    this.handleListeners()
  }

  componentDidUpdate() {
    this.handleListeners()
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, true)
  }

  handleListeners = () => {
    const { open, isSubMenu } = this.props
    if (open && !isSubMenu) {
      document.addEventListener('click', this.onDocumentClick, true)
    } else {
      document.removeEventListener('click', this.onDocumentClick, true)
    }
  }

  handleClose = () => {
    const { onClose } = this.props
    if (typeof onClose === 'function') {
      onClose()
    }

    this.setState({
      activeMenuItem: null,
      subMenuId: null,
    })
  }

  handleSubMenuClose = id => {
    this.setState({
      [this.getId(id)]: false,
    })
  }

  onDocumentClick = e => {
    const { anchorEl } = this.props
    if (!this.menu.current.contains(e.target) && !anchorEl.contains(e.target)) {
      this.handleClose()
    }
  }

  getId = id => _.kebabCase(id)

  setActiveMenuItem = (activeMenuItem, subMenuId) => {
    this.setState({
      activeMenuItem,
      subMenuId,
    })
  }

  render() {
    const {
      id,
      children,
      disablePortal,
      open,
      anchorEl,
      // onClose,
      placement,
    } = this.props

    const { activeMenuItem, subMenuId } = this.state

    return (
      <Popper
        open={open}
        anchorEl={anchorEl}
        disablePortal={disablePortal}
        style={{ zIndex: 10 }}
        placement={placement}
      >
        <div id={this.getId(id)} ref={this.menu} className={s.menu}>
          <MenuProvider
            value={{
              activeMenuItem,
              subMenuId,
              onClose: this.handleClose,
              setActiveMenuItem: this.setActiveMenuItem,
            }}
          >
            {Children.map(children, child => {
              if (!child) {
                return null
              }
              if (
                child.type === MenuItem ||
                child.type.displayName === MenuItem.displayName
              ) {
                return cloneElement(child, {
                  onClose: this.handleClose,
                  activeMenuItem,
                  setActiveMenuItem: this.setActiveMenuItem,
                })
              }
              if (
                child.type === Menu ||
                child.type.displayName === Menu.displayName
              ) {
                const { menu } = child.props
                return cloneElement(child, {
                  open: menu === subMenuId,
                  onClose: this.handleClose,
                  disablePortal: true,
                  anchorEl: activeMenuItem,
                  placement: 'right-start',
                  isSubMenu: true,
                  setActiveMenuItem: this.setActiveMenuItem,
                })
              }
              return child
            })}
          </MenuProvider>
        </div>
      </Popper>
    )
  }
}

export { default as MenuNested } from './MenuNested'

export { Menu, MenuItem, MenuSpacer }
