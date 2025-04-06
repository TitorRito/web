const fs = require('fs');
const path = require('path');

const COLORS = {
    RESET: "\x1b[0m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
};

/**
 * @dev Helper function to format function/event signatures for ABI.
 * @param {string} name - Function or event name.
 * @param {string} inputs - Comma-separated string of input types and names.
 * @param {string} type - The type of the abi item to return (function, event, constructor ect)
 * @param {string} stateMutability - The state mutability of the ABI.
 * @returns {string} - Formatted signature string.
 */
function formatSignature(name, inputs, type, stateMutability) {
    let formattedInputs = '';
    if (inputs) {
        formattedInputs = inputs
            ?.split(', ')
            .map((input) => input.split(' ')[0])
            .join(',');
    }

    let signature = `${type} ${name}(${formattedInputs})`;
    if (type === 'function') {
        signature = `${type} ${name}(${formattedInputs}) ${stateMutability}`; // Add state mutability
    }

    return signature;
}

/**
 * @dev Format ABI to a human-readable string array.
 * @param {Array} abi - The contract ABI.
 * @returns {Array<string>} Human-readable ABI as a string array.
 */
function formatABI(abi) {
    if (!abi) return null;

    const humanReadableABI = [];

    abi.forEach((item) => {
        let signature = null;

        if (item.type === 'function' || item.type === 'event' || item.type === 'constructor' || item.type === 'error') {
            signature = formatSignature(
                item.name,
                item.inputs?.map((input) => `${input.type} ${input.name}`).join(', ') || '',
                item.type,
                item.stateMutability // Pass state mutability
            );
            humanReadableABI.push(signature);
        }
    });

    return humanReadableABI;
}

/**
 * @dev Logs contract details to a JSON file.
 * @param {Object} contractObj - Object containing contract details.
 * @returns {string} - Path to the created log file.
 */
function logToFile(contractObj) {
    const logsDir = path.join(__dirname, "../logs");
    if (!fs.existsSync(logsDir)) {
        console.log(
            `${COLORS.CYAN}Log Dir not found... creating it...${COLORS.RESET}`
        );
        fs.mkdirSync(logsDir);
    }

    const filename = `${contractObj.name}-${contractObj.timestamp.replace(
        /[:\s-]/g,
        ""
    )}.json`;
    const filePath = path.join(logsDir, filename);

    try {
        fs.writeFileSync(filePath, JSON.stringify(contractObj, null, 2));
        console.log(
            `${COLORS.GREEN}Logged contract details to ${filePath}${COLORS.RESET}`
        );
        return filePath;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to write to file: ${filename}`);
    }
}

function getFormattedTimestamp(date) {
    return `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()} ${String(date.getHours()).padStart(
        2,
        "0"
    )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
        date.getSeconds()
    ).padStart(2, "0")}`;
}

/**
 * @dev Deploys a contract and logs its details
 * @param {string} contractName - Name of the contract to deploy
 * @param {Array} constructorArgs - Arguments to pass to the constructor (optional)
 * @returns {Object} - Deployed contract object
 */
async function deployMaintenance(contractName, constructorArgs = []) {
    try {
        console.log(
            `${COLORS.CYAN}--- Deploying ${contractName} ---${COLORS.RESET}`
        );
        const Contract = await ethers.getContractFactory(contractName);
        const contract = await Contract.deploy(...constructorArgs);
        await contract.waitForDeployment();
        const contractAddress = await contract.getAddress();

        // Get network information
        const providerNetwork = await ethers.provider.getNetwork();
        const formattedTimestamp = getFormattedTimestamp(new Date());
        const networkName = providerNetwork.name === "unknown" ? "localhost" : providerNetwork.name;

        const contractObj = {
            name: contractName,
            address: contractAddress,
            network: networkName,
            chainId: providerNetwork.chainId.toString(),
            abi: Contract.interface.format("json"),
            timestamp: formattedTimestamp,
        };

        if (constructorArgs.length > 0) {
            contractObj.constructorArgs = constructorArgs;
        }

        logToFile(contractObj);
        console.log(
            `${COLORS.YELLOW}[${contractObj.timestamp}]${COLORS.RESET} Successfully deployed ${COLORS.GREEN}${contractName}${COLORS.RESET} at ${COLORS.GREEN}${contractAddress}${COLORS.RESET} on chain ID ${COLORS.GREEN}${providerNetwork.chainId}${COLORS.RESET}`
        );

        // Return just the contract instance
        return contract;
    } catch (error) {
        console.error(
            `Failed to deploy ${COLORS.RED}${contractName}${COLORS.RESET}:`,
            error
        );
        throw error;
    }
}

module.exports = {
    COLORS,
    logToFile,
    formatABI,
    deployMaintenance
};
