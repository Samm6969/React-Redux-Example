import { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { ScrollElement } from 'react-scroll'
import { connect } from 'react-redux'
import { addChapterAction } from './tableOfContentsActions'

const mapDispatchToProps = dispatch => ({
  addChapter: name => {
    dispatch(addChapterAction(name))
  },
})

@ScrollElement
@connect(
  null,
  mapDispatchToProps,
)
class TableOfContentsChapter extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.node.isRequired,
    addChapter: PropTypes.func,
  }
  //
  // static contextTypes = {
  //   addChapter: PropTypes.func,
  // }

  constructor(props) {
    super(props)
    const { name, addChapter } = props
    addChapter(name)
  }

  // componentWillMount() {
  //   const { name, addChapter } = this.props
  //   // const { addChapter } = this.context
  //   addChapter(name)
  // }

  render() {
    const { children, name } = this.props
    return cloneElement(children, {
      name,
    })
  }
}

export default TableOfContentsChapter
