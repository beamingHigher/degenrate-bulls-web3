import React, { useState, useEffect } from 'react'
import TokenDisplay from './components/TokenDisplay'
import {
  isShibaSkin,
  isLazerEyes,
  isFireBackground,
} from './utils/tokenFunctions'
import { covalentServices } from './utils/covalentServices'

let contractAddress = '0x4f14483e16d9b2ad82f5634d694f3d29d4261ee5' //bullish degenerates address

function ERC1155Container(props) {
  const { connected, accounts, request, index } = props
  const { el, requestString } = request

  const tokenStateDefault = {
    name: '',
    tokenMetadata: null,
    tokenBalance: 0,
    isSkinShiba: false,
    isEyesLazer: false,
    isBackgroundFire: false,
  }

  const [token, setToken] = useState(tokenStateDefault)
  const [unlockMessage, setUnlockMessage] = useState('')
  const [unlockLink, setUnlockLink] = useState('#')

  const setUnlocks = (
    isSkinShiba,
    isEyesLazer,
    isBackgroundFire,
  ) => {
    if (isSkinShiba) {
      setUnlockMessage(
        'Claim Your Free Premium Discord Access! Be sure to message Market.Moves.Matt in the chat to set this up.',
      )
      setUnlockLink('https://discord.gg/SWZraNG')
    } else if (isEyesLazer) {
      setUnlockMessage(
        'Claim Your Free Flywheel Option Selling Course!',
      )
      // setUnlockLink('#');
    } else if (isBackgroundFire) {
      setUnlockMessage('Claim Your Free eBook Bundle!')
      // setUnlockLink('#');
    } else {
      setUnlockMessage(
        'Sorry, We dont have any offer for you. Please buy degenerate bulls NFT to unlock Premium offers.',
      )
      setUnlockLink(
        'https://opensea.io/collection/bullish-degenerates',
      )
    }
  }

  useEffect(() => {
    // flashTxBar(false)
    const loadTokenVault = async () => {
      await covalentServices
        .fetchTokenVault(accounts[0]) // testing:degenerate-bulls 0x5807873915b21162edd4ae472428f3ccc97b806a
        .then(async walletItems => {
          const nftArray = walletItems.items.filter(
            item => item.contract_address === contractAddress,
          )

          let name
          let tokenMetadata
          let tokenBalance
          let isSkinShiba
          let isEyesLazer
          let isBackgroundFire

          if (nftArray.length > 0) {
            name = nftArray[0].contract_name;
            tokenBalance = nftArray[0].balance;
            tokenMetadata = nftArray[0].nft_data;
            tokenMetadata.map((nftData) => {    
              isSkinShiba = isSkinShiba ? true : isShibaSkin(nftData.external_data);
              isEyesLazer = isEyesLazer ? true : isLazerEyes(nftData.external_data);
              isBackgroundFire = isBackgroundFire ? true : isFireBackground(nftData.external_data);
            });
          } else {
            name = 'NFT not found!!!'
            tokenMetadata = []
            tokenBalance = 0
            isSkinShiba = false
            isEyesLazer = false
            isBackgroundFire = false
          }
          setUnlocks(
            isSkinShiba,
            isEyesLazer,
            isBackgroundFire,
          )

          setToken({
            name,
            tokenMetadata,
            tokenBalance,
            isSkinShiba,
            isEyesLazer,
            isBackgroundFire,
          })
        })
    }

    if (connected) {
      loadTokenVault()
    }
  }, [connected])

  //Sort the requested components
  const reducer = request => {
    switch (request.method) {
      case 'display':
        return (
          <TokenDisplay
            domElement={request.el}
            message={unlockMessage}
            link={unlockLink}
            key={index}
          ></TokenDisplay>
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
