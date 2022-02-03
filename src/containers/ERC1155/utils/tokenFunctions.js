import { covalentServices } from './covalentServices'

const flashTxBar = toggle => {
  const bar = document.querySelector('div.web3-erc20-txbar')
  bar.style.visibility = toggle ? 'visible' : 'hidden'
}

const getBalance = nftArray => {
  try {
    let balance = nftArray[0].balance

    return balance
  } catch (error) {
    console.log('Error in Get Balance', error)
  }
}

const getTokenName = nftArray => {
  try {
    let name = nftArray[0].contract_name
    return name
  } catch (error) {
    console.log('Error in getTokenName', error)
  }
}

const getNftImage = async nftArray => {
  try {
    const tokenImage = covalentServices.fetchImage(
      nftArray[0].nft_data[0].token_id,
    )
    return tokenImage
  } catch (error) {
    console.log('Error in getNftImage', error)
  }
}

const getTokenMetadata = async nftArray => {
  try {
    const tokenMetadata = await covalentServices.fetchMetadata(
      nftArray[0].nft_data[0].token_id,
    )
    return tokenMetadata
  } catch (error) {
    console.log('Error in getTokenMetadata', error)
  }
}

const getSkinTrait = nftMetadata => {
  try {
    let skin = nftMetadata.attributes.filter(
      trait => trait.trait_type === 'Skin',
    )[0].value

    return skin
  } catch (error) {
    console.log('Error in Getting NFT skin', error.message)
  }
}

const getBackgroundTrait = nftMetadata => {
  console.log('metadata,', nftMetadata)
  try {
    let background = nftMetadata.attributes.filter(
      trait => trait.trait_type === 'background',
    )[0].value

    return background
  } catch (error) {
    console.log('Error in Getting NFT background', error.message)
  }
}

const getEyesTrait = nftMetadata => {
  try {
    let eyes = nftMetadata.attributes.filter(
      trait => trait.trait_type === 'Eyes',
    )[0].value

    return eyes
  } catch (error) {
    console.log('Error in Getting NFT skin', error.message)
  }
}

export {
  getBalance,
  getTokenName,
  getNftImage,
  getTokenMetadata,
  getSkinTrait,
  getBackgroundTrait,
  getEyesTrait,
}
