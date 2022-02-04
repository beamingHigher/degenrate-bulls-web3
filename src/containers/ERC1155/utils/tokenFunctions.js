import { covalentServices } from './covalentServices'

const flashTxBar = toggle => {
  const bar = document.querySelector('div.web3-erc20-txbar')
  bar.style.visibility = toggle ? 'visible' : 'hidden'
}

const getTokenName = nftArray => {
  try {
    let name = nftArray[0].contract_name
    return name
  } catch (error) {
    console.log('Error in getTokenName', error)
  }
}

const getTokenMetadata = async nftArray => {
  try {
    const tokenMetadata = nftArray[0].nft_data[0].external_data

    return tokenMetadata
  } catch (error) {
    console.log('Error in getTokenMetadata', error)
  }
}

const getSkinTrait = nftMetadata => {
  try {
    let skin;
    if (nftMetadata.attributes) {
      skin = nftMetadata.attributes.filter(
        trait => trait.trait_type === 'Skin',
      )[0].value
    }

    return skin
  } catch (error) {
    console.log('Error in Getting NFT skin', error.message)
  }
}

const getBackgroundTrait = nftMetadata => {
  try {
    let background;
    if (nftMetadata.attributes) {
      background = nftMetadata.attributes.filter(
        trait => trait.trait_type === 'background',
      )[0].value
    }

    return background
  } catch (error) {
    console.log('Error in Getting NFT background', error.message)
  }
}

const getEyesTrait = nftMetadata => {
  try {
    let eyes;
    if (nftMetadata.attributes) {
      eyes = nftMetadata.attributes.filter(
        trait => trait.trait_type === 'Eyes',
      )[0].value
    }

    return eyes
  } catch (error) {
    console.log('Error in Getting NFT skin', error.message)
  }
}

export {
  getTokenName,
  getTokenMetadata,
  getSkinTrait,
  getBackgroundTrait,
  getEyesTrait,
}
