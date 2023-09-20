import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Loading from '../loading'
import { Player } from '@lottiefiles/react-lottie-player';
import success from '../../assets/success.json'

type Props = {
  data: any,
  cancel: () => void
}

const Modal: FC<Props> = ({ data, cancel }: Props) => {
  const [loading, setLoading] = useState(false)
  const [play, setPlay] = useState(false)
  const [lowest, setLowest] = useState(0)
  const [high, setHigh] = useState(0)
  const [token0, setToken0] = useState(0)
  const [token1, setToken1] = useState(0)

  const calc = (type: string) => {
    console.log(data)
    if (type == 'lowest') {
      const value = (data.token1.tokenDayData[0].low / data.token0.tokenDayData[0].low)
      return (value - value * 0.17)
    }
    else {
      const value = (data.token1.tokenDayData[0].high / data.token0.tokenDayData[0].high)
      return (value + value * 0.2)
    }
  }

  useEffect(() => {
    setLowest(calc('lowest'))
    setHigh(calc('biggest'))
  }, [])

  const playAnimation = () => {
    setPlay(true)
    setTimeout(() => {
      setPlay(false)
      cancel()
    }, 1800)
  }

  const mintPosition = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      playAnimation()
    }, 800)
  }

  const getPrices = (type: string, price: number) => {
    if(type == 'token0') {
      setToken0(price)
      setToken1(price/data.token0Price) 
    }
    else {
      setToken1(price)
      setToken0(price/data.token1Price)
    }
  }
  return (
    <div className={styles.modal}>
      {
        loading && <Loading />
      }
      {
        play && <Player src={success} autoplay={true} className={`player ${styles.success}`} />
      }
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <p>Low price</p>
            <input type="number" value={lowest.toFixed(0)} onChange={(e) => setLowest(Number(e.target.value))} />
            <p>{data.token0.symbol} per {data.token1.symbol}</p>
          </div>
          <div className={styles.col}>
            <p>High price</p>
            <input type="number" value={high.toFixed(0)} onChange={(e) => setHigh(Number(e.target.value))} />
            <p>{data.token0.symbol} per {data.token1.symbol}</p>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.row}>
          <div className={styles.col}>
            <input type="number" value={token1.toFixed(0)} onChange={(e) => getPrices('token1', Number(e.target.value))} />
            <p>Deposit of {data.token1.symbol}</p>
          </div>
          <div className={styles.col}>
            <input type="number" value={token0.toFixed(0)} onChange={(e) => getPrices('token0', Number(e.target.value))} />
            <p>Deposit of {data.token0.symbol}</p>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.mint} disabled={token0 == 0 || token1 == 0} onClick={() => mintPosition()}>Create Position</button>
          <button className={styles.cancel} onClick={() => cancel()}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default Modal