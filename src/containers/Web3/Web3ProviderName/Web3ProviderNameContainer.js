import React, { Fragment } from 'react'
import uuidv1 from 'uuid/v1'
import Web3providerName from './Web3ProviderName'

function Web3providerNameContainer(props) {
  const { injected, domElement } = props
  const { connected, accounts, providerName } = injected

  if (connected && accounts.length > 0) {
    return (
      <Web3providerName
        providerName={providerName}
        domElement={domElement}
        key={uuidv1()}
      ></Web3providerName>
    )
  } else {
    return <Fragment></Fragment>
  }
}

export default Web3providerNameContainer
