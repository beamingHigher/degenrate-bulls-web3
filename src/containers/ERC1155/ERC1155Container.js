import React, { useState, useEffect } from 'react'
import TokenDisplay from './components/TokenDisplay'
import {
  getBalance,
  getTokenName,
  getNftImage,
  getTokenMetadata,
  getSkinTrait,
  getEyesTrait,
  getBackgroundTrait,
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
    tokenMetadata: null,
    tokenBalance: 0,
    tokenTraitSkin: '',
    tokenTraitEyes: '',
    tokenTraitBackground: '',
  }

  const [token, setToken] = useState(tokenStateDefault);
  const [unlockMessage, setUnlockMessage] = useState('');
  const [unlockLink, setUnlockLink] = useState('#');

  const setUnlocks = (tokenTraitSkin, tokenTraitEyes, tokenTraitBackground) => {
    if (tokenTraitSkin === 'SHIBA') {
      setUnlockMessage('Claim Your Free Premium Discord Access! Be sure to message Market.Moves.Matt in the chat to set this up.');
      setUnlockLink('https://discord.gg/SWZraNG');
    } else if (tokenTraitEyes === 'LAZER') {
      setUnlockMessage('Claim Your Free Flywheel Option Selling Course!');
      // setUnlockLink('#');
    } else if (tokenTraitBackground === 'brown') {
      setUnlockMessage('Claim Your Free eBook Bundle!');
      // setUnlockLink('#');
    } else {
      setUnlockMessage('Sorry, We dont have any offer for you. Please buy degenerate bulls NFT to unlock Premium offers.');
      setUnlockLink('https://opensea.io/collection/bullish-degenerates');
    }
  }

  useEffect(() => {
    // flashTxBar(false)
    const loadTokenVault = async () => {

      await covalentServices
        .fetchTokenVault(accounts[0]) // testing: 0x781edce144710ff845c1aafeb588f190f96fc365
        .then(async walletItems => {
          const nftArray = walletItems.items.filter(
            item => item.contract_address === contractAddress,
          )

          let name;
          let tokenMetadata;
          let nftImage;
          let tokenBalance;
          let tokenTraitSkin;
          let tokenTraitEyes;
          let tokenTraitBackground;

          if (nftArray.length > 0) {
            name = getTokenName(nftArray);
            tokenMetadata = await getTokenMetadata(nftArray);
            nftImage = await getNftImage(nftArray);
            tokenBalance = getBalance(nftArray);
            tokenTraitSkin = getSkinTrait(tokenMetadata);
            tokenTraitEyes = getEyesTrait(tokenMetadata);
            tokenTraitBackground = getBackgroundTrait(tokenMetadata);
            
          } else {
            name = 'NFT not found!!!';
            tokenMetadata = {};
            nftImage = 'https://cdn-icons-png.flaticon.com/128/2748/2748558.png';
            tokenBalance = 0;
            tokenTraitSkin = '';
            tokenTraitEyes = '';
            tokenTraitBackground = '';
          }
          setUnlocks(tokenTraitSkin, tokenTraitEyes, tokenTraitBackground);

          setToken({
            name,
            nftImage: String(nftImage),
            tokenMetadata: JSON.stringify(tokenMetadata),
            tokenBalance,
            tokenTraitSkin,
            tokenTraitEyes,
            tokenTraitBackground,
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
            injected={injected}
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
