import { FC } from 'react'
import styles from './styles.module.scss'
import LOGO from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={LOGO} alt="" />
      </div>
      <Link to='/'>
        Portfolio
      </Link>
      <Link to='/'>
        Trade
      </Link>
      <Link className={styles.active} to='/'>
        Earn
      </Link>
    </div>
  )
}

export default Header