const { ethers } = require('ethers')
const axios = require('axios')
require('dotenv').config()

const UNISWAP_V3_FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'

const GOERLI_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL_GOERLI + process.env.ALCHEMY_API_KEY2)
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY
const ZENIQToken_ADDRESS = '0x9c91647b32134C0c40Cda6F60eeF104AeD4393B8'
const WETH_ADDRESS = '0xbacEe7b6c6f2dA96836CCC9904b44E06ABcAB06E'
const APIKEY = process.env.APIKEY


const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY)
const connectedWallet = wallet.connect(GOERLI_PROVIDER)

async function main() {
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${UNISWAP_V3_FACTORY_ADDRESS}&apikey=${APIKEY}`
    const res = await axios.get(url)
    const abi = JSON.parse(res.data.result)

    const factoryContract = new ethers.Contract(
        UNISWAP_V3_FACTORY_ADDRESS,
        abi,    
        GOERLI_PROVIDER
    ) 

    // CRIA o pool
    const tx = await factoryContract.connect(connectedWallet).createPool(
        PUG_COIN_ADDRESS,
        COLLIE_COIN_ADDRESS,
        500
    )

    const receipt = await tx.wait()
    console.log('receipt', receipt)

    console.log("Detalhes da Transação: ", tx);

    console.log("Argumentos da Função: ", PUG_COIN_ADDRESS,
    COLLIE_COIN_ADDRESS,
    500);

    const newPoolAddress = await factoryContract.getPool(
        PUG_COIN_ADDRESS,
        COLLIE_COIN_ADDRESS,
        500
    )
    console.log('newPoolAdress', newPoolAddress)
}


main()
    .then(() => process.exit(0))

    .catch((error) =>{
        console.error(error);
        process.exit(1);
    });