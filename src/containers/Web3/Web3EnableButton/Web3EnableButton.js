import React from 'react'
import ReactDOM from 'react-dom'

class Web3EnableButton extends React.Component {
  constructor(props) {
    super(props)

    while (this.props.domElement.firstChild) {
      this.props.domElement.removeChild(
        this.props.domElement.firstChild,
      )
    }
  }

  async web3Enable() {
    window.ethereum ? await this.props.injected.requestAuth() : await window.web3.enable()
    // console.log('Injected web3:', this.props.injected);  // Added for debug at client's end.
  }

  render() {
    if (
      this.props.injected.connected &&
      this.props.injected.accounts.length > 0
    ) {
      return ReactDOM.createPortal(
        <a>Web3 Connected</a>,
        document.getElementById(this.props.domElement.id),
      )
    } else {
      return ReactDOM.createPortal(
        <a
          onClick={() => {
            this.web3Enable()
          }}
        >
          Enable Metamask
        </a>,
        document.getElementById(this.props.domElement.id),
      )
    }
  }
}

export default Web3EnableButton
