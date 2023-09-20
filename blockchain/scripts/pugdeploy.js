async function main() {
    const [deployer] = await ethers.getSigners();

    const PugCoin = await ethers.getContractFactory('PugCoin',deployer);
    const pugCoin = await PugCoin.deploy();
    
    console.log("Pug Coin deployed to ", pugCoin.address)
}

//npx hardhat run scripts/pugdeploy.js --network sepolia

main()
    .then(() => process.exit(0))

    .catch((error) =>{
        console.error(error);
        process.exit(1);
    });