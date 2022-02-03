import { httpsRequest } from './api-helper'

const covalentServices = {}
const covalentUri = 'https://api.covalenthq.com/v1/1/address/'
const tokenUriDoE =
  'https://ipfs.io/ipfs/QmcxJeVYRhyevvwQgsBfSWiY7QVmyNx1rQinzXbc1ZYut5/'
const tokenImageUriDoE =
  'https://ipfs.io/ipfs/QmdKKy9vrLvkXtYZwAiaKSWgtuHXk3HuSDoQ1m5GTWc5H2/'
// const openSeaUri = 'https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963/0xb5520299f41760d2a5a327254ebbab133320975d0000000000001100000186a0';

covalentServices.fetchTokenVault = async address => {
  const url = `${covalentUri +
    address}/balances_v2/?nft=true&key=ckey_2f68f1fc3e374e3a8a1a5a129e9`
  const response = await httpsRequest
    .Get(url)
    .then(apiResponse => apiResponse)
    .catch(error => error)
  return response.data
}

covalentServices.fetchMetadata = async tokenId => {
  const url = `${tokenUriDoE + tokenId}`
  const response = await httpsRequest
    .Get(url)
    .then(apiResponse => apiResponse)
    .catch(error => error.message)
  return response
}

covalentServices.fetchImage = tokenId => {
  const url = `${tokenImageUriDoE + tokenId}.png`
  return url
}

// eslint-disable-next-line import/prefer-default-export
export { covalentServices }
