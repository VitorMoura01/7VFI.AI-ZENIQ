async function main() {
    const [deployer] = await ethers.getSigners();

    const CollieCoin = await ethers.getContractFactory('CollieCoin',deployer);
    const collieCoin = await CollieCoin.deploy();
    
    console.log("Collie Coin deployed to ", collieCoin.address)
}

//npx hardhat run scripts/colliedeploy.js --network sepolia

main()
    .then(() => process.exit(0))

    .catch((error) =>{
        console.error(error);
        process.exit(1);
    });