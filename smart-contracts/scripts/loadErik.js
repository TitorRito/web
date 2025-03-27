//this is imported for the hardhat console.
//it implies we are on the hardhat 31337 ChainID network
const cAddres = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const cAbi = [
  "function COOLDOWN() view returns (uint256)",
  "function FLOWER() view returns (uint256)",
  "function FRUIT() view returns (uint256)",
  "function PLANT() view returns (uint256)",
  "function SEED() view returns (uint256)",
  "function SOIL() view returns (uint256)",
  "function WATER() view returns (uint256)",
];

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
