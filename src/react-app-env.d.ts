import { Web3Provider } from '@ethersproject/providers'

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: true
      on?: (...args: any[]) => void
      removeListener?: (...args: any[]) => void
    }
    web3?: any
    BinanceChain?: BinanceChain
    library: Web3Provider
    account: string | null
    chainId: number
  }
}
