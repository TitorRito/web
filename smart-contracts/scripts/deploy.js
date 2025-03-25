const { ethers } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("Erik20");
  
  console.log("Deploying contract...");
  const contract = await Contract.deploy();
  
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log("MyContract deployed to:", contractAddress);
  
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
