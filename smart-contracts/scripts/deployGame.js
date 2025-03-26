const {ethers} = require("hardhat");

(function deploy(){
    const name = "ErikGame";
    console.log("Deploying contract...");

    async function main(){
        const Contract = await ethers.getContractFactory(name);
        const contract = await Contract.deploy();
        await contract.waitForDeployment();
        const contractAddress = await contract.getAddress();
        console.log(`${name} deployed to:`, contractAddress);
    }

    main()
        .then(() => console.log('safe exit'))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
})()