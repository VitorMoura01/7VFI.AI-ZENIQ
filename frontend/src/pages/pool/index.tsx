import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './Example.css'
import { Environment, CurrentConfig } from '../../config'
import { getCurrencyBalance } from '../../libs/balance'
import {
  getPositionIds,
  getPositionInfo,
  mintPosition,
  PositionInfo,
} from '../../libs/positions'
import {
  connectBrowserExtensionWallet,
  getProvider,
  TransactionState,
  getWalletAddress,
} from '../../libs/providers'

const useOnBlockUpdated = (callback: (blockNumber: number) => void) => {
  useEffect(() => {
    const subscription = getProvider()?.on('block', callback)
    return () => {
      subscription?.removeAllListeners()
    }
  })
}

import { useQuery, gql } from '@apollo/client';

const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const ETH_PRICE_QUERY = gql`
  query ethPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`

const teste = gql`
{
  token(id:"0x5b52bfb8062ce664d74bbcd4cd6dc7df53fd7233") {
    name,
    whitelistPools (orderBy: liquidity, orderDirection: desc) {
      id,
      token0 { id, symbol, decimals, txCount, volume, totalSupply, tokenDayData (orderBy: date, orderDirection: desc, first: 1) {low, high, open, close, date}},
      token1 { id, symbol, decimals,  txCount, volume, totalSupply, tokenDayData (orderBy: date, orderDirection: desc, first: 1) {low, high, open, close, date}},
      liquidity,
      feeTier,
      token0Price,
      token1Price,
      sqrtPrice
    }
  }
}
`

const Pool = () => {
  const {
    loading: loadingPool,
    error: loadingError,
    data: poolData,
  } = useQuery(teste)
  
  const pool = poolData

  console.log(pool)

  // const [token0Balance, setToken0Balance] = useState<string>()
  // const [token1Balance, setToken1Balance] = useState<string>()
  // const [positionIds, setPositionIds] = useState<number[]>([])
  // const [positionsInfo, setPositionsInfo] = useState<PositionInfo[]>([])
  // const [txState, setTxState] = useState<TransactionState>(TransactionState.New)
  // const [blockNumber, setBlockNumber] = useState<number>(0)

  // // Listen for new blocks and update the wallet
  // useOnBlockUpdated(async (blockNumber: number) => {
  //   refreshBalances()
  //   setBlockNumber(blockNumber)
  // })

  // // Update wallet state given a block number
  // const refreshBalances = useCallback(async () => {
  //   const provider = getProvider()
  //   const address = getWalletAddress()
  //   if (!provider || !address) {
  //     return
  //   }

  //   // Set Balances
  //   setToken0Balance(
  //     await getCurrencyBalance(provider, address, CurrentConfig.tokens.token0)
  //   )
  //   setToken1Balance(
  //     await getCurrencyBalance(provider, address, CurrentConfig.tokens.token1)
  //   )

  //   // Set Position Info
  //   const ids = await getPositionIds()
  //   setPositionIds(ids)
  //   setPositionsInfo(await Promise.all(ids.map(getPositionInfo)))
  // }, [])

  // // Event Handlers

  // const onConnectWallet = useCallback(async () => {
  //   if (await connectBrowserExtensionWallet()) {
  //     refreshBalances()
  //   }
  // }, [refreshBalances])

  // const onMintPosition = useCallback(async () => {
  //   setTxState(TransactionState.Sending)
  //   setTxState(await mintPosition())
  // }, [])

  // // Formatted Data

  // const positionInfoStrings: string[] = useMemo(() => {
  //   if (positionIds.length !== positionsInfo.length) {
  //     return []
  //   }

  //   return positionIds
  //     .map((id, index) => [id, positionsInfo[index]])
  //     .map((info) => {
  //       const id = info[0]
  //       const posInfo = info[1] as PositionInfo
  //       return `${id}: ${posInfo.liquidity.toString()} liquidity, owed ${posInfo.tokensOwed0.toString()} and ${posInfo.tokensOwed1.toString()}`
  //     })
  // }, [positionIds, positionsInfo])

  // return (
  //   <div className="App">
  //     {CurrentConfig.rpc.mainnet === '' && (
  //       <h2 className="error">Please set your mainnet RPC URL in config.ts</h2>
  //     )}
  //     {CurrentConfig.env === Environment.WALLET_EXTENSION &&
  //       getProvider() === null && (
  //         <h2 className="error">
  //           Please install a wallet to use this example configuration
  //         </h2>
  //       )}
  //     {CurrentConfig.env === Environment.WALLET_EXTENSION &&
  //       getProvider() === null && (
  //         <h2 className="error">
  //           Please install a wallet to use this example configuration
  //         </h2>
  //       )}
  //     <h3>{`Wallet Address: ${getWalletAddress()}`}</h3>
  //     {CurrentConfig.env === Environment.WALLET_EXTENSION &&
  //       !getWalletAddress() && (
  //         <button onClick={onConnectWallet}>Connect Wallet</button>
  //       )}
  //     <h3>{`Block Number: ${blockNumber + 1}`}</h3>
  //     <h3>{`Transaction State: ${txState}`}</h3>
  //     <h3>{`${CurrentConfig.tokens.token0.symbol} Balance: ${token0Balance}`}</h3>
  //     <h3>{`${CurrentConfig.tokens.token1.symbol} Balance: ${token1Balance}`}</h3>
  //     <div>
  //       Positions:{' '}
  //       {positionInfoStrings.map((s, i) => (
  //         <p key={i}>{s}</p>
  //       ))}
  //     </div>
  //     <button
  //       onClick={() => onMintPosition()}
  //       disabled={
  //         txState === TransactionState.Sending ||
  //         getProvider() === null ||
  //         CurrentConfig.rpc.mainnet === ''
  //       }>
  //       <p>Mint Position</p>
  //     </button>
  //   </div>
  // )
  return <div>
    <div>
      Dai price:{' '}
      {loading || daiLoading
        ? 'Loading token data...'
        : '$' +
        // parse responses as floats and fix to 2 decimals
        (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
    </div>
    <div>
      Dai total liquidity:{' '}
      {daiLoading
        ? 'Loading token data...'
        : // display the total amount of DAI spread across all pools
        parseFloat(daiTotalLiquidity).toFixed(0)}
    </div>
  </div>
}

export default Pool