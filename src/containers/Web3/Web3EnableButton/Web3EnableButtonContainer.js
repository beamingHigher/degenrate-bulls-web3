import React, { Fragment } from 'react'
import Web3EnableButton from './Web3EnableButton'

function Web3EnableButtonContainer(props) {
  const { injected, domElement, key } = props
  const { connected, accounts, providerName } = injected
  if (connected && accounts.length > 0) {
    return (
      <Web3EnableButton
        providerName={providerName}
        domElement={domElement}
        key={key}
      ></Web3EnableButton>
    )
  } else {
    return <Fragment key={key}></Fragment>
  }
}

export default Web3EnableButtonContainer
