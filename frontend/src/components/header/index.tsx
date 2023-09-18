import { FC } from 'react'
import styles from './styles.module.scss'
import LOGO from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import web3Service from '../../services/web3'

const Header: FC = () => {
  const connectWallet = async (wallet: string) => {
    if (wallet == 'metamask') {
      await web3Service.connectMetamask()
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={LOGO} alt="" />
      </div>
      <Link to='/'>
        Portfólio
      </Link>
      <Link to='/'>
        Trade
      </Link>
      <Link className={styles.active} to='/'>
        Earn
      </Link>

      <button className={styles.button} onClick={() => connectWallet('metamask')}>
        Connect wallet
      </button>
    </div>
  )
}

export default Header