const fs = require('fs');
const path = require('path');

/**
 * Format ABI to a more readable format
 * @param {Array} abi - The contract ABI
 * @returns {Object} Simplified ABI with functions, events and other items
 */
function formatABI(abi) {
  if (!abi) return null;
  
  const simplified = {
    functions: [],
    events: [],
    other: []
  };
  
  abi.forEach(item => {
    const entry = {
      name: item.name || 'unnamed',
      type: item.type
    };
    
    if (item.type === 'function') {
      entry.inputs = item.inputs?.map(input => `${input.type} ${input.name}`).join(', ') || '';
      entry.outputs = item.outputs?.map(output => `${output.type} ${output.name || ''}`).join(', ') || '';
      entry.stateMutability = item.stateMutability;
      simplified.functions.push(entry);
    } 
    else if (item.type === 'event') {
      entry.inputs = item.inputs?.map(input => `${input.type} ${input.indexed ? 'indexed ' : ''}${input.name}`).join(', ') || '';
      simplified.events.push(entry);
    } 
    else {
      simplified.other.push(entry);
    }
  });
  
  return simplified;
}

/**
 * Ensures the logs directory exists
 */
function ensureLogDir() {
  const logDir = path.join(__dirname, '..', 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  return logDir;
}

/**
 * Write log to a file
 * @param {string} message - Log message to write
 * @param {string} contractName - Optional contract name for the log file
 */
function writeLogToFile(message, contractName = null) {
  try {
    const logDir = ensureLogDir();
    
    // Format: MM-DD_HH-MM-SS.log (excluding year)
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeStamp = `${month}-${day}_${hours}-${minutes}-${seconds}`;
    
    // Use contract name if provided, otherwise use "deployment"
    const baseName = contractName || "deployment";
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
 * Log function to control logging across scripts
 * Only logs once with complete contract details
 * @param {string} message - The message to log
 * @param {Object} options - Additional options for logging
 */
function log(message, options = {}) {
  const { type = 'info', contractDetails = null, writeToFile = true } = options;
  
  // Format timestamp
  const timestamp = new Date().toISOString();
  
  // Base log message
  let logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
  
  // Extract contract name for file naming
  let contractName = null;
  
  // Add contract details if provided
  if (contractDetails) {
    logMessage += '\nContract Details:';
    
    if (contractDetails.name) {
      logMessage += `\n  - Name: ${contractDetails.name}`;
      contractName = contractDetails.name;
    }
    
    if (contractDetails.address) {
      logMessage += `\n  - Address: ${contractDetails.address}`;
    }
    
    if (contractDetails.network) {
      logMessage += `\n  - Network: ${contractDetails.network}`;
    }
    
    if (contractDetails.chainId) {
      logMessage += `\n  - Chain ID: ${contractDetails.chainId}`;
    }
    
    if (contractDetails.abi) {
      const friendly = formatABI(contractDetails.abi);
      logMessage += '\n  - ABI Summary:';
      
      if (friendly.functions.length > 0) {
        logMessage += '\n    Functions:';
        friendly.functions.forEach(func => {
          logMessage += `\n      - ${func.name}(${func.inputs}) ${func.outputs ? '→ ' + func.outputs : ''} [${func.stateMutability}]`;
        });
      }
      
      if (friendly.events.length > 0) {
        logMessage += '\n    Events:';
        friendly.events.forEach(event => {
          logMessage += `\n      - ${event.name}(${event.inputs})`;
        });
      }
    }
    
    if (contractDetails.notes) {
      logMessage += `\n  - Notes: ${contractDetails.notes}`;
    }
  }
  
  // Log with appropriate method based on type
  switch(type.toLowerCase()) {
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
  writeLogToFile
};
