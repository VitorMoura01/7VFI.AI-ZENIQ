import { FC, useCallback, useEffect, useState } from "react"
import styles from './styles.module.scss'
// import PoolCard from "../../components/poolCard"
// import { Pool } from "../../types"
import Header from "../../components/header"

import zeniq from '../../assets/coins/zeniq.png'
import weth from '../../assets/coins/weth.png'
import uniswapService from "../../services/uniswap"
import PoolCard from "../../components/poolCard"
import { useQuery } from "@apollo/react-hooks"
import Modal from "../../components/modal"

const Home: FC = () => {
  const [pools, setPools] = useState<any>(null)
  const [tokensAddress, setTokensAddress] = useState([
    "0x5b52bfb8062ce664d74bbcd4cd6dc7df53fd7233"
  ])
  const [openedModal, setOpenedModal] = useState<any>(null)

  // const getPools = async () => {
    

  
  //   if (poolData) {
  //     setPools(poolData.response.token.whitelistPools);
  //   }
  //   // const response = await 
  //   // console.log(response.token.whitelistPools)
  //   // if (response) {
  //   //   setPools(response.token.whitelistPools)
  //   // }
  //   // return response.token.whitelistPools
  // }

  // getPools()

  const {
    loading: loadingPool,
    error: loadingError,
    data: poolData,
  } = useQuery(uniswapService.getQuery(tokensAddress))

  const openModal = (data: any) => {
    setOpenedModal(data)
    console.log(data)
  }

  // useEffect(() => {
  //   openedModal
  // }, [])
  
  return (
    <div className={styles.home}>
      <Header />

      {
        openedModal && <Modal data={openedModal} cancel={() => setOpenedModal(null)} />
      }

      <div className={styles.title}>
        <h1>Pools</h1>
        <p>Stake ZENIQ to earn rewards</p>
      </div>

      <div className={styles.divider} />

      <div className={styles.content}>
        <div className={styles.col}>
          {
            poolData && poolData.token.whitelistPools.map((pool: any, index: number) => {
              if (JSON.stringify(pool).includes('LINK')) {
                return null
              }
              else {
                return <PoolCard data={pool} openModal={() => openModal(pool)} key={index} />
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