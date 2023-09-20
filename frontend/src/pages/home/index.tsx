import { FC, useEffect, useState } from "react"
import styles from './styles.module.scss'
// import PoolCard from "../../components/poolCard"
// import { Pool } from "../../types"
import Header from "../../components/header"

import zeniq from '../../assets/coins/zeniq.png'
import weth from '../../assets/coins/weth.png'
import uniswapService from "../../services/uniswap"
import PoolCard from "../../components/poolCard"

const Home: FC = () => {
  const [pools, setPools] = useState<any>()
  const [tokensAddress, setTokensAddress] = useState([
    "0x5b52bfb8062ce664d74bbcd4cd6dc7df53fd7233"
  ])

  const getPools = async () => {
    const response = await uniswapService.getPools(tokensAddress)
    if (response) {
      setPools(response.token.whitelistPools)
      console.log(response.token.whitelistPools)
    }
  }

  getPools()

  return (
    <div className={styles.home}>
      <Header />

      <div className={styles.title}>
        <h1>Pools</h1>
        <p>Stake ZENIQ to earn rewards</p>
      </div>

      <div className={styles.divider} />

      <div className={styles.content}>
        <div className={styles.col}>
          {
            pools && pools.map((pool: any, index: number) =>  {
              console.log(pool)
              if(JSON.stringify(pool).includes('LINK')) {
                return null
              }
              else {
                return <PoolCard data={pool} key={index} />
              }
            })
          }
        </div>

        <div className={styles.card}>
          <p className={styles.total}>Total Received</p>
          <p className={styles.value}>$97.14</p>

          <div className={styles.divider}></div>

          <div className={styles.coin}>
            <div className={styles.icon}>
              <img src={weth} alt="" />
              <p className={styles.coinTitle}>WETH</p>
            </div>
            <p>54.08</p>
            <p className={styles.coinDesc}>($54.08)</p>
          </div>

          <div className={styles.coin}>
            <div className={styles.icon}>
              <img src={zeniq} alt="" />
              <p className={styles.coinTitle}>ZENIQ</p>
            </div>
            <p>43.06</p>
            <p className={styles.coinDesc}>($43.06)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home