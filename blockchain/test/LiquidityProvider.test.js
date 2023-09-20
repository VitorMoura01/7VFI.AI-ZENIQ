const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LiquidityProvider", function () {
  let LiquidityProvider, liquidityProvider, owner, addr1;
  const tokenAAddress = "0x5b52bfB8062Ce664D74bbCd4Cd6DC7Df53Fd7233";
  const tokenBAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const uniswapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88s";

  beforeEach(async () => {
    LiquidityProvider = await ethers.getContractFactory("LiquidityProvider");
    [owner, addr1] = await ethers.getSigners();
    liquidityProvider = await LiquidityProvider.deploy(uniswapRouterAddress, positionManagerAddress);
    await liquidityProvider.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await liquidityProvider.owner()).to.equal(owner.address);
    });
  });

  describe("Provide Liquidity", function () {
    it("Should provide liquidity to the pool", async function () {
      const amountADesired = ethers.utils.parseUnits("1.0", 18);
      const amountBDesired = ethers.utils.parseUnits("1.0", 18);
      const amountAMin = ethers.utils.parseUnits("0.9", 18);
      const amountBMin = ethers.utils.parseUnits("0.9", 18);
      const fee = 3000; // tAxa
      const tickLower = -60; // exemplo de tick lower
      const tickUpper = 60; // exemplo de tick upper
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutos a partir de agora

      await liquidityProvider.provideLiquidity(
        tokenAAddress, 
        tokenBAddress, 
        fee, 
        tickLower, 
        tickUpper, 
        amountADesired, 
        amountBDesired, 
        amountAMin, 
        amountBMin, 
        deadline
      );
    });
  });


});
