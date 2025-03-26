const { ethers, network } = require("hardhat");
const { log } = require("./utils");

async function main() {
  log("Deploying Erik1155...", { type: 'info', writeToFile: false });
  
  // Get the contract factory
  const Erik1155 = await ethers.getContractFactory("Erik1155");
  
  // Deploy the contract
  const erik1155 = await Erik1155.deploy();
  
  // Wait for deployment to confirm
  await erik1155.deploymentTransaction().wait();
  
  // Get the contract address
  const contractAddress = await erik1155.getAddress();
  
  // Get network information including chainId
  const chainId = (await ethers.provider.getNetwork()).chainId;
  
  // Log success with contract details
  log("Erik1155 deployment complete!", { 
    type: 'info',
    contractDetails: {
      name: "Erik1155",
      address: contractAddress,
      network: network.name,
      chainId: chainId.toString(),
      abi: Erik1155.interface.fragments,
      notes: "ERC1155 token with basic minting and forging functionality"
    },
    writeToFile: true
  });
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    log(error.message, { type: 'error', writeToFile: false });
    process.exit(1);
  });
