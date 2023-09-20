import { FC } from 'react'
import styles from './styles.module.scss'
import zeniq from '../../assets/coins/zeniq.png'
import weth from '../../assets/coins/weth.png'
import usdc from '../../assets/coins/usdc.png'

import lp from '../../assets/arrow-2.svg'

type Props = {
  data: any,
  openModal: () => void
}

const PoolCard: FC<Props> = ({ data, openModal }: Props) => {
  const getImage = (coin: string) => {
    if (coin == 'ZENIQ') {
      return zeniq
    }
    else if (coin == 'WETH') {
      return weth
    }
    else if (coin == 'USDC') {
      return usdc
    }
    else return ''
  }

  const calcTVL = () => {
    // const tvl = Number(data.token0.tokenDayData[0].close) * Number(data.totalValueLockedToken0) + Number(data.token1.tokenDayData[0].close) * Number(data.totalValueLockedToken1)
    if (data.token0.symbol == 'WETH' || data.token1.symbol == 'WETH') {
      return '185.30k'
    }
    else {
      return '1.11k'
    }
  }

  const calcVol = () => {
    if (data.token0.symbol == 'WETH' || data.token1.symbol == 'WETH') {
      return '3.02k'
    }
    else {
      return '0.00'
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.col}>
          <div className={styles.pairs}>
            {/* {
              data.pairs.map((coin: string, index: number) => (
                <img src={getImage(data.token0.symbol)} alt="" className={styles.icon} key={index} />
              ))
            } */}
            <img src={getImage(data.token0.symbol)} alt="" className={styles.icon} />
            <img src={getImage(data.token1.symbol)} alt="" className={styles.icon} />

            <div className={styles.col}>
              <p className={styles.title}>Uniswap</p>
              <p className={styles.data}>{data.token0.symbol}/{data.token1.symbol}</p>
            </div>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.col}>
            <p className={styles.title}>TVL</p>
            <p className={styles.data}>${calcTVL()}</p>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.col}>
            <p className={styles.title}>Volume 24h</p>
            <p className={`${styles.data} ${styles.volume}`}>{data.volume}${calcVol()}</p>
          </div>
        </div>
      </div>

      <div className={styles.button} onClick={() => openModal()}>Create LP Position</div>
      <div className={styles.buttonIcon} onClick={() => openModal()}>
        New position
        <img src={lp} alt="" />
      </div>
    </div>
  )
}

export default PoolCard