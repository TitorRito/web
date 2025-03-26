const fs = require('fs');
const path = require('path');

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
 * @dev Ensures the logs directory exists.
 */
function ensureLogDir() {
    const logDir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, {recursive: true});
    }
    return logDir;
}

/**
 * @dev Generate timestamp for log file names.
 * @returns {string} - Timestamp string.
 */
function generateTimestamp() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${month}-${day}_${hours}-${minutes}-${seconds}`;
}

/**
 * @dev Write log to a file.
 * @param {string} message - Log message to write.
 * @param {string} contractName - Optional contract name for the log file.
 */
function writeLogToFile(message, contractName = null) {
    try {
        const logDir = ensureLogDir();
        const timeStamp = generateTimestamp();
        const baseName = contractName || 'deployment';
        const fileName = `${baseName}-${timeStamp}.log`;
        const filePath = path.join(logDir, fileName);

        fs.writeFileSync(filePath, message);
        return filePath;
    } catch (error) {
        console.error('Failed to write log to file:', error);
        return null;
    }
}

/**
 * @dev Builds the contract details section of the log message.
 * @param {Object} contractDetails - Object containing details about the contract.
 * @returns {string} - Formatted contract details string.
 */
function buildContractDetails(contractDetails) {
    let details = '\nContract Details:';

    if (contractDetails.name) {
        details += `\n  - Name: ${contractDetails.name}`;
    }

    if (contractDetails.address) {
        details += `\n  - Address: ${contractDetails.address}`;
    }

    if (contractDetails.network) {
        details += `\n  - Network: ${contractDetails.network}`;
    }

    if (contractDetails.chainId) {
        details += `\n  - Chain ID: ${contractDetails.chainId}`;
    }

    if (contractDetails.abi) {
        const humanReadableABI = formatABI(contractDetails.abi);
        details += '\n  - Human-Readable ABI:';
        details += `\n${JSON.stringify(humanReadableABI, null, 2)}`;  // Format as JSON
    }

    if (contractDetails.notes) {
        details += `\n  - Notes: ${contractDetails.notes}`;
    }

    return details;
}

/**
 * @dev Log function to control logging across scripts.
 * Only logs once with complete contract details.
 * @param {string} message - The message to log.
 * @param {Object} options - Additional options for logging.
 */
function log(message, options = {}) {
    const {type = 'info', contractDetails = null, writeToFile = true} = options;

    // Format timestamp
    const timestamp = new Date().toISOString();

    // Base log message
    let logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;

    // Extract contract name for file naming
    let contractName = contractDetails?.name || null;

    // Add contract details if provided
    if (contractDetails) {
        logMessage += buildContractDetails(contractDetails);
    }

    // Log with appropriate method based on type
    switch (type.toLowerCase()) {
        case 'error':
            console.error(logMessage);
            break;
        case 'warning':
            console.warn(logMessage);
            break;
        default:
            console.log(logMessage);
    }

    // Write log to file if specified - only do this for the main completion log
    if (writeToFile) {
        const filePath = writeLogToFile(logMessage, contractName);
        if (filePath) {
            console.log(`Deployment details logged to: ${filePath}`);
        }
    }

    return logMessage;
}

module.exports = {
    log,
    formatABI,
    writeLogToFile,
};
