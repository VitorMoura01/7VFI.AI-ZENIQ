import { FC } from 'react'
import styles from './styles.module.scss'
import { Pool } from '../../types'

import zeniq from '../../assets/coins/zeniq.png'
import weth from '../../assets/coins/weth.png'

import eye from '../../assets/eye.svg'

type Props = {
  data: Pool
}

const PoolCard: FC<Props> = ({ data }: Props) => {
  const getImage = (coin: string) => {
    if (coin == 'ZENIQ') {
      return zeniq
    }
    else if (coin == 'WETH') {
      return weth
    }
    else return ''
  }

  return (
    <div className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.col}>
          <div className={styles.pairs}>
            {
              data.pairs.map((coin: string, index: number) => (
                <img src={getImage(coin)} alt="" className={styles.icon} key={index} />
              ))
            }
            <div className={styles.col}>
              <p className={styles.title}>{data.network}</p>
              <p className={styles.data}>{data.pairs[0]}/{data.pairs[1]}</p>
            </div>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.col}>
            <p className={styles.title}>TVL</p>
            <p className={styles.data}>${data.tvl}</p>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.col}>
            <p className={styles.title}>Apy</p>
            <p className={`${styles.data} ${styles.apy}`}>{data.apy}%</p>
          </div>
        </div>
      </div>

      <div className={styles.button}>See analytics</div>
      <div className={styles.buttonIcon}>
        <img src={eye} alt="" />
      </div>
    </div>
  )
}

export default PoolCard