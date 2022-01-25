import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

class Web3NetworkId extends React.Component {
  constructor(props) {
    super(props)

    while (this.props.domElement.firstChild) {
      this.props.domElement.removeChild(
        this.props.domElement.firstChild,
      )
    }
  }

  render() {
    return ReactDOM.createPortal(
      <Fragment>{this.props.networkId}</Fragment>,
      document.getElementById(this.props.domElement.id),
    )
  }
}

export default Web3NetworkId
