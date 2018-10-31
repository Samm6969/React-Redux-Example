/* eslint-disable */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ScrollLink } from 'react-scroll'
import Nav from '../Nav'
import NavItem from '../Nav/NavItem'
import MenuSpacer from '../Menu/MenuSpacer'

import s from './TableOfContents.scss'
import sassVar from '../../sass/variables'

const { padMd } = sassVar
const Link = ScrollLink(NavItem)

export default class TableOfContents extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    containerId: PropTypes.string,
    sidebar: PropTypes.node,
  }

  static childContextTypes = {
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    ),
    addChapter: PropTypes.func,
  }

  static defaultProps = {
    containerId: 'TableOfContents',
  }

  state = {
    chapters: [],
    active: null,
    scrollOffset: padMd,
  }

  getChildContext() {
    const { chapters } = this.state
    return {
      chapters,
      addChapter: this.addChapter,
    }
  }

  componentDidMount() {
    this.calculateScrollOffset()
  }

  componentDidUpdate() {
    this.calculateScrollOffset()
  }

  onSetActive = title => {
    const { active } = this.state
    if (active !== title) {
      this.setState({
        active: title,
      })
    }
  }

  get table() {
    const { containerId } = this.props
    const { chapters, active } = this.state
    return (
      <Nav className={s.nav}>
        {chapters.map(({ title }) => (
          <Link
            className={s.link}
            key={title}
            containerId={containerId}
            to={title}
            offset={-24}
            onSetActive={this.onSetActive}
            spy
            smooth
            isDynamic
            active={active === title}
          >
            {title}
          </Link>
        ))}
      </Nav>
    )
  }

  chapters = []

  addChapter = title => {
    if (!this.chapters.includes(title)) {
      this.chapters.push({
        title,
      })
      this.setState({
        chapters: this.chapters,
      })
    }
  }

  calculateScrollOffset = () => {
    const { chapters, scrollOffset } = this.state
    if (chapters.length !== 0) {
      const { title } = chapters[chapters.length - 1]
      const lastEl = document.getElementsByName(title).item(0)
      const { height: containerHeight } = this.container.getBoundingClientRect()
      const {
        height: docHeight,
      } = document.documentElement.getBoundingClientRect()
      if (lastEl && containerHeight < docHeight) {
        let nextScrollOffset = padMd
        const { height: lastElHeight } = lastEl.getBoundingClientRect()
        const realContainerHeight = containerHeight - padMd * 2
        if (realContainerHeight > lastElHeight) {
          nextScrollOffset = realContainerHeight - lastElHeight
        }
        if (nextScrollOffset !== scrollOffset) {
          this.setState({
            scrollOffset: nextScrollOffset,
          })
        }
      }
    }
  }

  render() {
    const { title, children, sidebar, containerId } = this.props
    const { scrollOffset } = this.state
    return (
      <div className={s.container}>
        <div className={s.sidebar}>
          {title && (
            <Fragment>
              <h3 className={s.title}>{title}</h3>
              <MenuSpacer />
            </Fragment>
          )}
          {this.table}
          <MenuSpacer />
          {sidebar}
        </div>
        <div
          className={s.contents}
          id={containerId}
          ref={node => {
            this.container = node
          }}
        >
          <div className={s.inner} style={{ paddingBottom: scrollOffset }}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}
