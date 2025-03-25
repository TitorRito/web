const path = require('path');
const fs = require('fs');
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    // Keep your existing paths if any
  },
  networks: {
    hardhat: {},
    // You can add other networks like mainnet, testnet, etc.
  },
  // Add a custom resolver for external dependencies
  resolvers: {
    paths: [
      // First, try the default node_modules folder
      "node_modules",
      // Then, try the parent directory's node_modules folder
      path.join(__dirname, "..", "node_modules")
    ]
  }
};
