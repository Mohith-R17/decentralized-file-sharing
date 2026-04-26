require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20", // Make sure this matches your pragma in FileStorage.sol
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Sh55JEqbmWC5FOzQF6l8wumQ-FhKCSOe",
      accounts: ["0x8d0d60208426ab4dd4c6e7313ebb3d4e47924896a081b3ccecc41c5008a79542"],
  },
  }
};