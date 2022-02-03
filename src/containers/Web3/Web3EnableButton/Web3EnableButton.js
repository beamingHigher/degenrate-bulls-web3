import React, { Fragment } from 'react'
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
    await this.props.injected.requestAuth().catch(error => {
      console.log('Error', error.message)
    })
  }

  async displayPopup() {
    const elem = document.getElementById('web3-erc1155-display')
    elem.classList.remove("Hidden");
    elem.classList.remove("hidden");
  }

  render() {
    if (
      this.props.injected.connected &&
      this.props.injected.accounts.length > 0
    ) {
      return ReactDOM.createPortal(
        <Fragment>
          <a
            onClick={() => {
              this.displayPopup()
            }}
          >
            {this.props.injected.accounts[0].slice(0,5).concat('...', this.props.injected.accounts[0].slice(this.props.injected.accounts[0].length - 6,this.props.injected.accounts[0].length - 1))}
          </a>
        </Fragment>,
        document.getElementById(this.props.domElement.id),
      )
    } else {
      return ReactDOM.createPortal(
        <Fragment>
          <a
            onClick={() => {
              this.web3Enable()
            }}
          >
            Enable Metamask
          </a>
        </Fragment>,
        document.getElementById(this.props.domElement.id),
      )
    }
  }
}

export default Web3EnableButton
