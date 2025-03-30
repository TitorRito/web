import fs from "fs/promises";
import path from "path";

const DIRECTORY_PATH = path.join(process.cwd(), "../smart-contracts", "logs");

// Reuse your logic, adapted to async
async function readJsonFilesFromDirectory() {
    try {
        const files = await fs.readdir(DIRECTORY_PATH);
        const jsonFiles = files.filter(
            (file) => path.extname(file).toLowerCase() === ".json"
        );
        return jsonFiles.map((file) => path.join(DIRECTORY_PATH, file));
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
        return [];
    }
}

async function readJsonFileNamesFromDirectory() {
    try {
        const files = await fs.readdir(DIRECTORY_PATH);
        return files.filter((file) => path.extname(file).toLowerCase() === ".json");
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
        return [];
    }
}

async function getAllJson() {
    try {
        const jsonFilePaths = await readJsonFilesFromDirectory();
        const jsonContents = await Promise.all(
            jsonFilePaths.map(async (filePath) => {
                try {
                    const fileContent = await fs.readFile(filePath, "utf8");
                    return JSON.parse(fileContent);
                } catch (error) {
                    console.error(`Error reading or parsing ${filePath}: ${error}`);
                    return null;
                }
            })
        );
        return jsonContents.filter((content) => content !== null);
    } catch (error) {
        console.error(`Error processing JSON files: ${error}`);
        return [];
    }
}

async function getJsonByName(fileName) {
    try {
        const jsonFileName = fileName.endsWith(".json") ? fileName : `${fileName}.json`;
        const filePath = path.join(DIRECTORY_PATH, jsonFileName);

        const fileContent = await fs.readFile(filePath, "utf8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading or parsing ${fileName}: ${error}`);
        return null;
    }
}

export async function GET(request) {
    const url = new URL(request.url);
    const params = url.searchParams;

    // Handle getContracts
    if (params.has("getContracts")) {
        const contracts = await getAllJson();
        return new Response(JSON.stringify({ data: contracts }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    // Handle getContract=Name | name = Erik1155-27032025144412 => file from logs
    else if (params.has("getContract")) {
        const contractName = params.get("getContract");
        if (!contractName) {
            // If no name is provided, return all contracts
            const contracts = await getAllJson();
            return new Response(JSON.stringify({ data: contracts }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
        const contract = await getJsonByName(contractName);
        if (contract === null) {
            return new Response(
                JSON.stringify({ error: `Contract ${contractName} not found` }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
        return new Response(JSON.stringify({ data: contract }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    // Handle readContractFactory
    else if (params.has("readContractFactory")) {
        try {
            const jsonFileNames = await readJsonFileNamesFromDirectory();
            return new Response(
                JSON.stringify({ data: jsonFileNames }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } catch (error) {
            return new Response(
                JSON.stringify({ error: `Error reading contract factory: ${error.message}` }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    }
    // Default response
    else {
        const baseUrl = `${request.url.split("?")[0]}`;
        return new Response(
            JSON.stringify({
                error: "No valid query provided. Use getContracts, getContract=Name, or readContractFactory",
                links: {
                    getContracts: `${baseUrl}?getContracts`,
                    getContract: `${baseUrl}?getContract=YourContractName`,
                    readContractFactory: `${baseUrl}?readContractFactory`,
                },
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}