import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Web3EnableButton from './containers/Web3/Web3EnableButton/Web3EnableButton'
import Web3ERC1155Container from './containers/ERC1155/ERC1155Container'

function App() {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const elements = $('[id^="web3-"]')

  const reducer = request => {
    switch (request.arg) {
      case 'erc1155':
        if (connected && accounts.length > 0) {
          return (
            <Web3ERC1155Container
              connected={connected}
              accounts={accounts}
              key={request.index}
              domElement={request.el}
              request={request}
              index={request.index}
            ></Web3ERC1155Container>
          )
        }
        break
      case 'enableButton':
        return (
          <Web3EnableButton
            connected={connected}
            accounts={accounts}
            setConnected={setConnected}
            setAccounts={setAccounts}
            key={request.index}
            domElement={request.el}
          ></Web3EnableButton>
        )
        break
      case 'enableButtonM':
        return (
          <Web3EnableButton
            connected={connected}
            accounts={accounts}
            setConnected={setConnected}
            setAccounts={setAccounts}
            key={request.index}
            domElement={request.el}
          ></Web3EnableButton>
        )
        break

      default:
        return null
    }
  }

  return (
    <Fragment>
      {elements.map(element => {
        const domElementId = elements[element].id
        const requestString = domElementId.split('-')
        return reducer({
          arg: requestString[1],
          el: elements[element],
          index: element,
          requestString,
        })
      })}
    </Fragment>
  )
}

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('react-target'),
)
