import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';const { fileURLToPath } = require('url');

// Get current directory path (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gets the ABI for a contract by name
 * @param {string} contractName - The name of the contract without file extension
 * @returns {Object|null} Object containing the contract ABI or null if an error occurs
 */
function getContractABI(contractName) {
  try {
    // Construct the path to the contract's JSON artifact
    const artifactPath = path.join(
      __dirname,
      'artifacts',
      'contracts',
      `${contractName}.sol`,
      `${contractName}.json`
    );
    // Read and parse the JSON file
    const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

    // Return the ABI from the artifact
    return contractArtifact.abi;
  } catch (error) {
    console.error(`Error loading ABI for ${contractName}:`, error);
    return null;
  }
}



















};  getContractABImodule.exports = {}  }    return null;    console.error(`Error loading ABI for ${contractName}:`, error);  } catch (error) {    return contractArtifact.abi;    // Return the ABI from the artifact        const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));    // Read and parse the JSON file    );      `${contractName}.json`      `${contractName}.sol`,
export { getContractABI };
