const { ethers, network } = require("hardhat");
const { log } = require("./utils");

async function main() {
  log("Deploying ErikGameLv2...", { type: 'info', writeToFile: false });
  
  // Get the contract factory
  const ErikGameLv2 = await ethers.getContractFactory("ErikGameLv2");
  
  // Deploy the contract - for v6, deploy() returns the deployed instance directly
  const erikGameLv2 = await ErikGameLv2.deploy();
  
  // Wait for deployment to confirm
  await erikGameLv2.deploymentTransaction().wait();
  
  // Get the contract address
  const contractAddress = await erikGameLv2.getAddress();
  
  // Log success with contract details
  log("ErikGameLv2 deployment complete!", { 
    type: 'info',
    contractDetails: {
      name: "ErikGameLv2",
      address: contractAddress,
      network: network.name,
      abi: ErikGameLv2.interface.fragments,
      notes: "Game of Twinkles - Level 2 with authorization required for token two"
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