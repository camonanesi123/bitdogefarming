import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { getWeb3 } from 'utils/web3'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'// Addresses
import claimRefundAbi from 'config/abi/claimRefund.json'
import profileABI from 'config/abi/pancakeProfile.json'
import erc721Abi from 'config/abi/erc721.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import {
  getBunnyFactoryAddress,
  getClaimRefundAddress,
  getPancakeProfileAddress,
  getPointCenterIfoAddress,
} from 'utils/addressHelpers'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? getWeb3()
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}
export const getIfoV1Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV1Abi, address, web3)
}
export const getIfoV2Contract = (address: string, web3?: Web3) => {
  return getContract(ifoV2Abi, address, web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getPancakeProfileAddress(), web3)
}
export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi, address, web3)
}
export const getBunnyFactoryContract = (web3?: Web3) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), web3)
}