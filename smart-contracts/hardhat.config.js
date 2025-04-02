const path = require('path');
const fs = require('fs');
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// Get API key and private key from environment variables
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    // Keep your existing paths if any
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY !== "" ? [PRIVATE_KEY] : [],
      chainId: 11155111
    },
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
