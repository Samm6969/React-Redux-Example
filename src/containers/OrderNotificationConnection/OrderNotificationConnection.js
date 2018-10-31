import { Component } from 'react'
import { connect } from 'react-redux'
import Stomp from 'stompjs'
import PropTypes from 'prop-types'
// import WebSocket from 'ws'

const mapStateToProps = state => ({
  exchangeId: state.exchangeId,
})

@connect(mapStateToProps)
class OrderNotificationConnection extends Component {
  static propTypes = {
    exchangeId: PropTypes.string,
  }

  componentDidMount() {
    const { exchangeId } = this.props

    // eslint-disable-next-line
    console.log(exchangeId)

    if (typeof exchangeId === 'string') {
      const exchange = `/exchange/${exchangeId}`
      const socket = new WebSocket(
        `ws://localhost:3001/fundconnect/api/tradeBlotter`,
      )
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        {},
        frame => {
          // eslint-disable-next-line
          console.log(frame)
          this.stompClient.subscribe(exchange, message => {
            // eslint-disable-next-line
            console.log(message)
          })
          // this.sendRequest()
        },
      )
    }
  }

  render() {
    return null
  }
}

export default OrderNotificationConnection
