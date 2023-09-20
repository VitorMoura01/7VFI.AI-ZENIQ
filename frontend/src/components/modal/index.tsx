import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'

type Props = {
  data: any,
  cancel: () => void
}

const Modal: FC<Props> = ({ data, cancel }: Props) => {
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

  return (
    <div className={styles.modal}>
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
            <input type="number" value={token0} onChange={(e) => setToken0(Number(e.target.value))} />
            <p>Deposit of {data.token0.symbol}</p>
          </div>
          <div className={styles.col}>
            <input type="number" value={token1} onChange={(e) => setToken1(Number(e.target.value))} />
            <p>Deposit of {data.token1.symbol}</p>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.mint}>Create Position</button>
          <button className={styles.cancel} onClick={() => cancel()}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default Modal