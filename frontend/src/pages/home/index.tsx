import { FC, useEffect, useState } from "react"
import styles from './styles.module.scss'
import PoolCard from "../../components/poolCard"
import { Pool } from "../../types"
import Header from "../../components/header"

import zeniq from '../../assets/coins/zeniq.png'
import weth from '../../assets/coins/weth.png'

const Home: FC = () => {
  const [pools, setPools] = useState<Pool[]>()

  useEffect(() => {
    setPools([
      {
        network: "Ethereum",
        pairs: ["WETH", "ZENIQ"],
        tvl: '8600',
        apy: '110'
      },
      {
        network: "Polygon",
        pairs: ["WETH", "ZENIQ"],
        tvl: '1500',
        apy: '85'
      },
      {
        network: "Ethereum",
        pairs: ["WETH", "ZENIQ"],
        tvl: '120.000',
        apy: '45'
      },
      {
        network: "Ethereum",
        pairs: ["WETH", "ZENIQ"],
        tvl: '672.762',
        apy: '45'
      }
    ])
  }, [])

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
            pools && pools.map((pool: Pool, index: number) => <PoolCard data={pool} key={index} />)
          }
        </div>
        <div className={styles.card}>
          <p className={styles.total}>Total Received</p>
          <p className={styles.value}>$947.14</p>

          <div className={styles.divider}></div>

          <div className={styles.coin}>
            <div className={styles.icon}>
              <img src={weth} alt="" />
              <p className={styles.coinTitle}>WETH</p>
            </div>
            <p>250.04</p>
            <p className={styles.coinDesc}>($250.04)</p>
          </div>

          <div className={styles.coin}>
            <div className={styles.icon}>
              <img src={zeniq} alt="" />
              <p className={styles.coinTitle}>ZENIQ</p>
            </div>
            <p>697.10</p>
            <p className={styles.coinDesc}>($697.10)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home