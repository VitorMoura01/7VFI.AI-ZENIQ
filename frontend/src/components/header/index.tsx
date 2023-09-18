import { FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import LOGO from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import web3Service from '../../services/web3'

const Header: FC = () => {
  const [account, setAccount] = useState<string>('0x0');

  const connectWallet = async (wallet: string) => {
    if (wallet == 'metamask') {
      const response: any = await web3Service.connectMetamask()
      if (response) {
        setAccount(response[0])
      }
    }
  }

  useEffect(() => {
    if (!window.ethereum) {
      // Nothing to do here... no ethereum provider found
      return;
    }
    const accountWasChanged: any = (accounts: string) => {
      if (account[0]) {
        setAccount(accounts[0]);
        console.log(accounts[0]);
      }
    }
    const getAndsetAccount = async () => {
      const changedAccounts: any = await window.ethereum?.request({ method: 'eth_requestAccounts' });
      console.log(account)
      if (changedAccounts) {
        setAccount(changedAccounts[0]);
      }
      console.log('getAndsetAccount');
    }
    const clearAccount = () => {
      setAccount('0x0');
      console.log('clearAccount');
    };
    window.ethereum?.on('accountsChanged', accountWasChanged);
    window.ethereum?.on('connect', getAndsetAccount);
    window.ethereum?.on('disconnect', clearAccount);
  }, [])

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

      {
        account == '0x0' ?
          <button className={styles.button} onClick={() => connectWallet('metamask')}>
            Connect wallet
          </button>
          : <p className={styles.connected}>Connected with metamsk</p>
      }
    </div>
  )
}

export default Header