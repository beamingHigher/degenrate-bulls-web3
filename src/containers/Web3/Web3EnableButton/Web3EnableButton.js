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
    await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        this.props.setAccounts(accounts)
        this.props.setConnected(true)

        window.ethereum.on('accountsChanged', accounts => {
          this.props.setAccounts(accounts)
          this.props.setConnected(true)
        })

        window.ethereum.on('disconnect', (code, reason) => {
          console.log(code, reason)
          this.props.setAccounts([])
          this.props.setConnected(false)
        })
      })
      .catch(error => {
        console.log('Error', error.message)
      })
  }

  async displayPopup() {
    const elem = document.getElementById('web3-erc1155-display')
    elem.classList.remove('Hidden')
    elem.classList.remove('hidden')
  }

  render() {
    if (this.props.connected && this.props.accounts.length > 0) {
      return ReactDOM.createPortal(
        <Fragment>
          <a
            onClick={() => {
              this.displayPopup()
            }}
          >
            {this.props.accounts[0]
              .slice(0, 5)
              .concat(
                '...',
                this.props.accounts[0].slice(
                  this.props.accounts[0].length - 5,
                  this.props.accounts[0].length,
                ),
              )}
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
