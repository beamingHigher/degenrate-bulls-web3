import { httpsRequest } from './api-helper'

const covalentServices = {}
const covalentUri = 'https://api.covalenthq.com/v1/137/address/'
const tokenUriDoE =
  'https://ipfs.io/ipfs/QmcxJeVYRhyevvwQgsBfSWiY7QVmyNx1rQinzXbc1ZYut5/'

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

// eslint-disable-next-line import/prefer-default-export
export { covalentServices }
