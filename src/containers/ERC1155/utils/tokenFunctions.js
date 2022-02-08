import { covalentServices } from './covalentServices'

const flashTxBar = toggle => {
  const bar = document.querySelector('div.web3-erc20-txbar')
  bar.style.visibility = toggle ? 'visible' : 'hidden'
}

const isShibaSkin = nftMetadata => {
  try {
    let skin
    if (nftMetadata.attributes) {
      skin = nftMetadata.attributes.filter(
        trait => trait.trait_type === 'Skin',
      )[0].value
    }

    return skin === 'Shiba'
  } catch (error) {
    console.log('Error in Getting NFT skin', error.message)
  }
}

const isLazerEyes = nftMetadata => {
  try {
    let eyes
    if (nftMetadata.attributes) {
      eyes = nftMetadata.attributes.filter(
        trait => trait.trait_type === 'eyes',
      )[0].value
    }

    return eyes === 'Lazer'
  } catch (error) {
    console.log('Error in Getting NFT skin', error.message)
  }
}

const isFireBackground = nftMetadata => {
  try {
    let background
    if (nftMetadata.attributes) {
      background = nftMetadata.attributes.filter(
        trait => trait.trait_type === 'background',
      )[0].value
    }

    return background === 'Body on Fire'
  } catch (error) {
    console.log('Error in Getting NFT background', error.message)
  }
}

export {
  isShibaSkin,
  isLazerEyes,
  isFireBackground,
}
