const { ethers } = require("hardhat");
const { deployMaintenance, COLORS, logToFile } = require("./utils");

async function main() {
  console.log(`${COLORS.MAGENTA}Deploying contracts...${COLORS.RESET}`);

  try {
    // Deploy Erik token contract first
    const erik = await deployMaintenance("Erik");
    const erikAddress = await erik.getAddress();

    // Deploy ErikForge contract and pass the Erik token address
    const erikForge = await deployMaintenance("ErikForge", [erikAddress]);

    console.log(`${COLORS.GREEN}Deployment complete!${COLORS.RESET}`);

    // Optional: Log contract relationships separately if needed
    console.log(
      `${COLORS.BLUE}ErikForge is linked to Erik token at ${erikAddress}${COLORS.RESET}`
    );
  } catch (error) {
    console.error(`${COLORS.RED}Deployment failed:${COLORS.RESET}`, error);
    throw error;
  }
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
