const { ethers } = require("hardhat");

const [auth, a1, a2, a3, a4] = await ethers.getSigners();
const cName = "ErikGameLv2";
const contract = await ethers.getContractFactory(cName);

console.log(`Deploying ${cName} from address: ${auth.address}...`);

// Deploy the contract using auth as the signer
const dp = await contract.connect(auth).deploy();

await dp.waitForDeployment();
const deployedAddress = await dp.getAddress();
const contractAuth = await dp._auth();

console.log(`${cName} deployed to: ${deployedAddress}`);
console.log(`Deployed by: ${contractAuth}`);