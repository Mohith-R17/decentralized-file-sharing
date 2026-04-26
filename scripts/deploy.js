const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const FileSharing = await hre.ethers.getContractFactory("FileSharing");
  const fileSharing = await FileSharing.deploy();

  await fileSharing.waitForDeployment();

  console.log("FileSharing contract deployed to:", await fileSharing.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
