import React, { Component, Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

import { MenuConsumer } from './MenuContext'
import { Menu, MenuItem } from './Menu'

class MenuNested extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    setActiveMenuItem: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    activeMenuItem: PropTypes.object,
    subMenuId: PropTypes.string,
  }

  render() {
    const {
      children,
      onClose,
      activeMenuItem,
      setActiveMenuItem,
      subMenuId,
    } = this.props

    return (
      <Fragment>
        {Children.map(children, child => {
          if (
            child.type === MenuItem ||
            child.type.displayName === MenuItem.displayName
          ) {
            return cloneElement(child, {
              onClose,
              activeMenuItem,
              setActiveMenuItem,
            })
          }
          if (
            child.type === Menu ||
            child.type.displayName === Menu.displayName
          ) {
            const { menu } = child.props
            return cloneElement(child, {
              open: menu === subMenuId,
              onClose,
              disablePortal: true,
              anchorEl: activeMenuItem,
              placement: 'right-start',
              isSubMenu: true,
              setActiveMenuItem,
            })
          }
          return child
        })}
      </Fragment>
    )
  }
}

export default props => (
  <MenuConsumer>
    {({ activeMenuItem, subMenuId, onClose, setActiveMenuItem }) => (
      <MenuNested
        activeMenuItem={activeMenuItem}
        subMenuId={subMenuId}
        onClose={onClose}
        setActiveMenuItem={setActiveMenuItem}
        {...props}
      />
    )}
  </MenuConsumer>
)
