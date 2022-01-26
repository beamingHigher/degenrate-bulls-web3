import { covalentServices } from './covalentServices'

const flashTxBar = toggle => {
  const bar = document.querySelector('div.web3-erc20-txbar')
  bar.style.visibility = toggle ? 'visible' : 'hidden'
}

const getBalance = nftArray => {
  try {
    let balance = nftArray[0].nft_data.length

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

export { getBalance, getTokenName, getNftImage, getTokenMetadata }
