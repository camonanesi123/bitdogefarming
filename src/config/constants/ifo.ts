import farms from './farms'
import tokens from './tokens'
import { Ifo, Token } from './types'

const cakeBnbLpToken: Token = {
  symbol: farms[1].lpSymbol,
  address: farms[1].lpAddresses,
  decimals: 18,
}

const ifos: Ifo[] = [
  {
    id: 'gen',
    address: '0x9A9E44D81722dcF29E3214F2D070f52F10E2f1f8',
    isActive: true,
    name: 'test of Farming (GEN)',
    poolBasic: {
      saleAmount: '40,000 GEN',
      raiseAmount: '$750,000',
      cakeToBurn: '$375,000',
      distributionRatio: 0.5,
    },
    poolUnlimited: {
      saleAmount: '40,000 GEN',
      raiseAmount: '$1,750,000',
      cakeToBurn: '$875,000',
      distributionRatio: 0.5,
    },
    currency: cakeBnbLpToken,
    token: tokens.gen,
    releaseBlockNumber: 7175800,
    campaignId: '511090001',
    articleUrl: 'https://dragonballfinance.org/',
    tokenOfferingPrice: 0.25,
    isV1: false,
  }
]

export default ifos
