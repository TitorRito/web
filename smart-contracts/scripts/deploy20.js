const { ethers } = require("hardhat");
const { log } = require("./utils");

async function main() {
  const Contract = await ethers.getContractFactory("Erik20");
  
  console.log("Deploying contract...");
  const contract = await Contract.deploy();
  
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  
  // Get the network information
  const network = await ethers.provider.getNetwork();
  const networkName = network.name === 'unknown' ? 'localhost' : network.name;
  const chainId = network.chainId.toString();
  
  // Log with detailed information including chainId
  log("Erik20 deployment completed successfully", {
    type: 'success',
    contractDetails: {
      name: "Erik20",
      address: contractAddress,
      network: networkName,
      chainId: chainId,
      abi: Contract.interface.fragments,
      notes: "ERC20 token contract deployed"
    }
  });
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    log("Deployment failed", { type: 'error', contractDetails: { notes: error.message } });
    process.exit(1);
  });
