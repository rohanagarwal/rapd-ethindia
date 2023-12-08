import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const advertisableCoin = await ethers.getContractFactory("AdvertisableCoin");
  const advertisableCoinDeploy = await advertisableCoin.deploy();
  await advertisableCoinDeploy.waitForDeployment();
  console.log("advertisableCoinDeploy deployed to:", await advertisableCoinDeploy.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
