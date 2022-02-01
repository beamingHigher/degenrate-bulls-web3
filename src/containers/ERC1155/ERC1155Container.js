import React, { useState, useEffect, useCallback } from 'react'
import TokenMetadata from './components/TokenMetadata'
import TokenName from './components/TokenName'
import NftImage from './components/nftImage'
import TokenBalance from './components/TokenBalance'
import {
  getBalance,
  getTokenName,
  getNftImage,
  getTokenMetadata,
} from './utils/tokenFunctions'
import { covalentServices } from './utils/covalentServices'

let contractAddress = '0xd8cdb4b17a741dc7c6a57a650974cd2eba544ff7' //Configured for testing

function ERC1155Container(props) {
  const { injected, request, index } = props
  const { connected, accounts, lib } = injected
  const { el, requestString } = request

  const tokenStateDefault = {
    name: '',
    nftImage: '',
    tokenMetadata: '',
    tokenBalance: 0,
  }

  const [token, setToken] = useState(tokenStateDefault)

  useEffect(() => {
    // flashTxBar(false)
    const loadTokenVault = async () => {
      setToken({
        name: 'Getting details...',
        nftImage:
          'https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png',
        tokenMetadata: 'Getting details...',
        tokenBalance: 0,
      })

      await covalentServices
        .fetchTokenVault(accounts[0])
        .then(async walletItems => {
          const nftArray = walletItems.items.filter(
            item => item.contract_address === contractAddress,
          )

          if (nftArray.length > 0) {
            const name = getTokenName(nftArray)
            const tokenMetadata = await getTokenMetadata(nftArray)
            const nftImage = await getNftImage(nftArray)
            const tokenBalance = getBalance(nftArray)

            setToken({
              name,
              nftImage: String(nftImage),
              tokenMetadata: JSON.stringify(tokenMetadata),
              tokenBalance,
            })
          } else {
            setToken({
              name: 'NFT not found!!!',
              nftImage:
                'https://cdn-icons-png.flaticon.com/128/2748/2748558.png',
              tokenMetadata: '{}',
              tokenBalance: 0,
            })
          }
        })
    }

    if (connected) {
      loadTokenVault()
    }
  }, [connected])

  //Sort the requested components
  const reducer = request => {
    switch (request.method) {
      case 'name':
        return (
          <TokenName
            domElement={request.el}
            name={token.name}
            injected={injected}
            key={index}
          ></TokenName>
        )
        break

      case 'nftImage':
        return (
          <NftImage
            domElement={request.el}
            nftImage={token.nftImage}
            injected={injected}
            key={index}
          ></NftImage>
        )
        break
      case 'balance':
        return (
          <TokenBalance
            domElement={request.el}
            balance={token.tokenBalance}
            injected={injected}
            key={index}
            request={request}
          ></TokenBalance>
        )
        break
      case 'metadata':
        return (
          <TokenMetadata
            domElement={request.el}
            tokenMetadata={token.tokenMetadata}
            injected={injected}
            key={index}
          ></TokenMetadata>
        )
        break

      default:
        return null
    }
  }

  //Do nothing if tokenMetadata is not ready.
  if (accounts.length > 0 && token.tokenMetadata && connected) {
    return reducer({
      method: requestString[2],
      el,
      requestString,
    })
  } else {
    return null
  }
}

export default ERC1155Container
