import fs from 'fs';
import path from 'path';

// Default directory path for JSON files
export const DIRECTORY_PATH = '../../../smart-contracts/logs';

export function readJsonFilesFromDirectory(directoryPath: string = DIRECTORY_PATH): string[] {
    try {
        const files = fs.readdirSync(directoryPath);

        const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

        return jsonFiles.map(file => path.join(directoryPath, file));
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
        return [];
    }
}

/**
 * Reads and parses all JSON files from the specified directory
 * @param directoryPath The path to the directory to read from
 * @returns Array of parsed JSON objects from all JSON files in the directory
 */
export function getAllJson(directoryPath: string = DIRECTORY_PATH): any[] {
    try {
        // Get all JSON file paths
        const jsonFilePaths = readJsonFilesFromDirectory(directoryPath);

        // Read and parse each JSON file
        const jsonContents = jsonFilePaths.map(filePath => {
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(fileContent);
            } catch (error) {
                console.error(`Error reading or parsing ${filePath}: ${error}`);
                return null;
            }
        });

        // Filter out any null values from failed reads/parses
        return jsonContents.filter(content => content !== null);
    } catch (error) {
        console.error(`Error processing JSON files: ${error}`);
        return [];
    }
}

/**
 * Gets a JSON object by filename from the specified directory
 * @param fileName The name of the JSON file (with or without .json extension)
 * @param directoryPath The path to the directory to read from
 * @returns The parsed JSON object if found, null otherwise
 */
export function getJsonByName(fileName: string, directoryPath: string = DIRECTORY_PATH): any | null {
    try {
        // Ensure the fileName has .json extension
        const jsonFileName = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
        const filePath = path.join(directoryPath, jsonFileName);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return null;
        }

        // Read and parse the JSON file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading or parsing ${fileName}: ${error}`);
        return null;
    }
}
