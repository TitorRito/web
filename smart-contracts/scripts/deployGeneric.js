//deploy generic
const { ethers, network } = require("hardhat");

const contractToDeploy = process.argv[2];

if (!contractToDeploy) {
    console.error("Please provide the contract name to deploy as argv2");
    process.exit(1);
}


async function main() {
    console.log(`Deploying ${contractToDeploy}...`);

    // Get the contract factory
    const Contract = await ethers.getContractFactory(contractToDeploy);

    // Deploy the contract - for v6, deploy() returns the deployed instance directly
    const contract = await Contract.deploy();

    // Wait for deployment to confirm
    await contract.deploymentTransaction.wait();

    // Get the contract address
    const contractAddress = await contract.getAddress();

    const chainId = (await ethers.provider.getNetwork()).chainId;

    // Log success with contract details
    console.log(`${contractToDeploy} deployment complete!`);
    console.log(`Contract Details:
  - Name: ${contractToDeploy}
  - Address: ${contractAddress}
  - Network: ${network.name}
  - ChainId: ${chainId}
  - ABI: ${JSON.stringify(Contract.interface.fragments)}
`);

}
