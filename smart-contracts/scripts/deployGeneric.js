const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

const COLORS = {
    RESET: "\x1b[0m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m"
};

// const contractsToDeploy = ["Erik1155", "Erik20", "ErikGame"];
const contractsToDeploy = ["Erik1155"];

function logToFile(contractObj) {
    const logsDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logsDir)) {
        console.log(`${COLORS.CYAN}Log Dir not found... creating it...${COLORS.RESET}`);
        fs.mkdirSync(logsDir);
    }

    const filename = `${contractObj.name}-${contractObj.timestamp.replace(/[:\s-]/g, '')}.json`;
    const filePath = path.join(logsDir, filename);

    try {
        fs.writeFileSync(filePath, JSON.stringify(contractObj, null, 2));
        console.log(`${COLORS.GREEN}Logged contract details to ${filePath}${COLORS.RESET}`);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to write to file: ${filename}`);
    }
}

function getFormattedTimestamp(date) {
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

async function main() {
    console.log(`\n${COLORS.MAGENTA}HARDHAT ${COLORS.RESET} to deploy ${COLORS.YELLOW}${contractsToDeploy.length}${COLORS.RESET} contracts: ${COLORS.YELLOW}${contractsToDeploy.join(', ')}${COLORS.RESET}\n`);

    for (const contractName of contractsToDeploy) {
        try {
            console.log(`${COLORS.CYAN}--- Deploying ${contractName} ---${COLORS.RESET}`);
            const Contract = await ethers.getContractFactory(contractName);
            const contract = await Contract.deploy();
            await contract.waitForDeployment();

            const providerNetwork = await ethers.provider.getNetwork();
            const formattedTimestamp = getFormattedTimestamp(new Date());

            const contractObj = {
                name: contractName,
                address: contract.target,
                network: providerNetwork.name === 'unknown' ? 'localhost' : providerNetwork.name,
                chainId: providerNetwork.chainId.toString(),
                abi: Contract.interface.format('json'), // Updated to use format('json')
                timestamp: formattedTimestamp
            };

            logToFile(contractObj);
            console.log(`${COLORS.YELLOW}[${contractObj.timestamp}]${COLORS.RESET} Successfully deployed ${COLORS.GREEN}${contractName}${COLORS.RESET} at ${COLORS.GREEN}${contract.target}${COLORS.RESET} on chain ID ${COLORS.GREEN}${providerNetwork.chainId}${COLORS.RESET}`);
        } catch (error) {
            console.error(`Failed to deploy ${COLORS.RED}${contractName}${COLORS.RESET}:`, error);
        }
    }
}

main()
    .then(() => {
        console.log(`\n${COLORS.GREEN}Finished deploying all contracts.${COLORS.RESET}`);
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });