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
    console.log('window.ethereum', this.props.injected)
    await this.props.injected.requestAuth().catch(error => {
      console.log('Error', error.message)
    })
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
