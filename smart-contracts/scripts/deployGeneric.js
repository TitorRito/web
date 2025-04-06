const { ethers } = require("hardhat");
const { deployMaintenance, COLORS } = require("./utils");

// const contractsToDeploy = ["Erik1155", "Erik20", "ErikGame"];
const contractsToDeploy = ["E1155"];

async function main() {
    console.log(
        `\n${COLORS.MAGENTA}HARDHAT ${COLORS.RESET} to deploy ${COLORS.YELLOW}${contractsToDeploy.length}${COLORS.RESET} contracts: ${COLORS.YELLOW}${contractsToDeploy.join(", ")}${COLORS.RESET}\n`
    );

    for (const contractName of contractsToDeploy) {
        try {
            await deployMaintenance(contractName);
        } catch (error) {
            // Error handling already done in deployMaintenance
            // Just continue with next contract
        }
    }
}

main()
    .then(() => {
        console.log(
            `\n${COLORS.GREEN}Finished deploying all contracts.${COLORS.RESET}`
        );
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
