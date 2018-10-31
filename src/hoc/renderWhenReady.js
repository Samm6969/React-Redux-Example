import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line
import { render } from '@sencha/ext-react'
// eslint-disable-next-line
import { reactify } from '@sencha/ext-react'

const ExtReact = reactify('ExtReact')

const launchQueue = []

const renderWhenReady = Component =>
  class ExtReactRenderWhenReady extends React.Component {
    static isExtJSComponent = true

    static propTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      wrapperProps: PropTypes.object,
    }

    constructor(props) {
      super(props)
      this.state = {
        ready: typeof Ext === 'undefined' ? false : Ext.isReady,
        done: false,
      }
      this.node = React.createRef()
    }

    componentWillMount() {
      if (!this.state.ready) {
        launchQueue.push(this)
      }
    }

    componentDidMount() {
      this.renderExtComp()
    }

    componentDidUpdate() {
      this.renderExtComp()
    }

    renderExtComp = () => {
      const { wrapperProps, ...rest } = this.props
      const element = this.node.current
      if (
        ExtReact &&
        element &&
        reactify &&
        render &&
        this.state.ready === true &&
        this.state.done === false
      ) {
        this.state.done = true
        render(
          <ExtReact>
            <Component wrapper={element} {...rest} />
          </ExtReact>,
          element,
        )
      }
    }

    render() {
      const { wrapperProps } = this.props
      return <div style={{ flex: 1 }} {...wrapperProps} ref={this.node} />
    }
  }

export default renderWhenReady

if (typeof Ext !== 'undefined') {
  Ext.onReady(() => {
    launchQueue.forEach(queued => {
      queued.setState({ ready: true })
    })
  })
}

// if (typeof Ext === 'undefined') {
//   // Ext.dom.Element.prototype.ripple
//   // Ext.Widget.prototype.isXType
//   // Ext.Component.prototype.isXType
//   const Ext = {
//     ClassManager: {
//       getByAlias() {},
//       get() {},
//     },
//     define() {},
//     XTemplate: {
//       getTpl() {},
//     },
//     dom: {
//       Element: {
//         prototype: {
//           ripple: null,
//         },
//       },
//     },
//     Widget: {
//       prototype: {
//         isXType: null,
//       },
//     },
//     Component: {
//       prototype: {
//         isXType: null,
//       },
//     },
//     onReady() {},
//   }
//   global.Ext = Ext
//   global.window = { Ext }
// }
