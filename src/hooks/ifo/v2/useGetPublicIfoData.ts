import BigNumber from 'bignumber.js'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import { useBlock, useLpTokenPrice } from 'state/hooks'
import { useIfoV2Contract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import { useEffect, useState } from 'react'
import makeBatchRequest from 'utils/makeBatchRequest'
import Web3 from 'web3'
import { PublicIfoData, PoolCharacteristics } from '../types'
import { getStatus } from '../helpers'


// https://github.com/pancakeswap/pancake-contracts/blob/master/projects/ifo/contracts/IFOV2.sol#L431
// 1,000,000,000 / 100
const TAX_PRECISION = 10000000000

const formatPool = (pool) => ({
  raisingAmountPool: new BigNumber(pool[0]),
  offeringAmountPool: new BigNumber(pool[1]),
  limitPerUserInLP: new BigNumber(pool[2]),
  hasTax: pool[3],
  totalAmountPool: new BigNumber(pool[4]),
  sumTaxesOverflow: new BigNumber(pool[5]),
})

/**
 * Gets all public data of an IFO
 */
const useGetPublicIfoData = (ifo: Ifo): PublicIfoData => {
  const { address, releaseBlockNumber } = ifo
  const lpTokenPriceInUsd = useLpTokenPrice(ifo.currency.symbol)
  const { fastRefresh } = useRefresh()

  const [state, setState] = useState({
    status: 'idle' as IfoStatus,
    blocksRemaining: 0,
    secondsUntilStart: 0,
    progress: 5,
    secondsUntilEnd: 0,
    poolBasic: {
      raisingAmountPool: new BigNumber(0),
      offeringAmountPool: new BigNumber(0),
      limitPerUserInLP: new BigNumber(0),
      taxRate: 0,
      totalAmountPool: new BigNumber(0),
      sumTaxesOverflow: new BigNumber(0),
    },
    poolUnlimited: {
      raisingAmountPool: new BigNumber(0),
      offeringAmountPool: new BigNumber(0),
      limitPerUserInLP: new BigNumber(0),
      taxRate: 0,
      totalAmountPool: new BigNumber(0),
      sumTaxesOverflow: new BigNumber(0),
    },
    startBlockNum: 0,
    endBlockNum: 0,
    numberPoints: 0,
  })
  const { currentBlock } = useBlock()
  
  const contract = useIfoV2Contract(address)
  const [ currentBlock1, setCurrentBlock1 ] = useState<number>(69999);

  useEffect(() => {
    const fetchProgress = async () => {
      const [startBlock, endBlock, poolBasic, poolUnlimited, taxRate, numberPoints] = (await makeBatchRequest([
        contract.methods.startBlock().call,
        contract.methods.endBlock().call,
        contract.methods.viewPoolInformation(0).call,
        contract.methods.viewPoolInformation(1).call,
        contract.methods.viewPoolTaxRateOverflow(1).call,
        contract.methods.numberPoints().call,
      ])) as [string, string, PoolCharacteristics, PoolCharacteristics, number, number]

      const poolBasicFormatted = formatPool(poolBasic)
      const poolUnlimitedFormatted = formatPool(poolUnlimited)

      const web3 = new Web3('https://bsc-dataseed.binance.org')
      await web3.eth.getBlockNumber().then(function (result){
        setCurrentBlock1(result)
        const startBlockNum = parseInt(startBlock, 10)
        const endBlockNum = parseInt(endBlock, 10)
        console.log(currentBlock1)
        const status = getStatus(currentBlock1, startBlockNum, endBlockNum)
        const totalBlocks = endBlockNum - startBlockNum
        const blocksRemaining = endBlockNum - currentBlock1

        // Calculate the total progress until finished or until start
        const progress =
        currentBlock1 > startBlockNum
            ? ((currentBlock1 - startBlockNum) / totalBlocks) * 100
            : ((currentBlock1 - releaseBlockNumber) / (startBlockNum - releaseBlockNumber)) * 100

        setState((prev) => ({
          ...prev,
          secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
          secondsUntilStart: (startBlockNum - currentBlock1) * BSC_BLOCK_TIME,
          poolBasic: { ...poolBasicFormatted, taxRate: 0 },
          poolUnlimited: { ...poolUnlimitedFormatted, taxRate: taxRate / TAX_PRECISION },
          status,
          progress,
          blocksRemaining,
          startBlockNum,
          endBlockNum,
          numberPoints,
        }))
      })
      
    }

    fetchProgress()
  }, [contract, currentBlock1, releaseBlockNumber, fastRefresh])

  return { ...state, currencyPriceInUSD: lpTokenPriceInUsd }
}

export default useGetPublicIfoData
