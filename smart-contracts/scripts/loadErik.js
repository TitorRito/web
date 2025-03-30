//this is imported for the hardhat console.
//it implies we are on the hardhat 31337 ChainID network

const [owner, a1, a2, a3, a4] = await ethers.getSigners();

const contract = await ethers.getContractFactory("Erik1155");
const c = await contract.deploy();
await c.waitForDeployment();

const c1 = await c.connect(a1);
const c2 = await c.connect(a2);
const c3 = await c.connect(a3);
