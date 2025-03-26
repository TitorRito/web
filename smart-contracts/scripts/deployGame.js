const {ethers} = require("hardhat");
const {log} = require("./utils");

(function deploy(){
    const name = "ErikGame";
    // Remove initial log here

    async function main(){
        console.log("Deploying contract..."); // Simple console log for initial feedback
        
        const Contract = await ethers.getContractFactory(name);
        const contract = await Contract.deploy();
        await contract.waitForDeployment();
        const contractAddress = await contract.getAddress();
        
        // Get the network information
        const network = await ethers.provider.getNetwork();
        const networkName = network.name === 'unknown' ? 'localhost' : network.name;
        
        // Single comprehensive log with all contract details
        log(`${name} deployment completed successfully`, {
            type: 'success',
            contractDetails: {
                name: name,
                address: contractAddress,
                network: networkName,
                abi: Contract.interface.fragments,
                notes: "Game contract deployed with standard configuration"
            }
        });
    }

    main()
        .then(() => {}) // Remove redundant log
        .catch((error) => {
            log("Deployment failed", { type: 'error', contractDetails: { notes: error.message } });
            process.exit(1);
        });
})()