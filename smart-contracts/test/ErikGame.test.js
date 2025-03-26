const { expect } = require("chai");
const { ethers } = require("hardhat");

const CONTRACT_NAME = "ErikGame";

describe("Eriks Contract Functions", function () {
    it("Should set _auth from msg.sender in the constructor", async function () {
        const [owner] = await ethers.getSigners();

        const ErikGame = await ethers.getContractFactory(CONTRACT_NAME);

        const hardhatErikGame = await ErikGame.deploy();

        await hardhatErikGame.waitForDeployment();

        expect(await hardhatErikGame._auth()).to.equal(owner.address);
    });

    it("Should mint tokens correctly", async function () {
        const [_, addr1, addr2] = await ethers.getSigners();

        const ErikGame = await ethers.getContractFactory(CONTRACT_NAME);
        const hardhatErikGame = await ErikGame.deploy();
        await hardhatErikGame.waitForDeployment();

        //addr1 = proper gameplay
        await hardhatErikGame.connect(addr1).getTokenOne();
        expect(await hardhatErikGame.tokenOneBalance(addr1.address)).to.equal(1);
        await hardhatErikGame.connect(addr1).getTokenTwo();
        expect(await hardhatErikGame.tokenTwoBalance(addr1.address)).to.equal(1);

        //addr2 = imporoper becasue no token One
        await expect(
            hardhatErikGame.connect(addr2).getTokenTwo()
        ).to.be.revertedWith("You must have token one to get token two");
        
    });

    it("Should emit TokenEvent when tokens are minted", async function () {
        const [owner, addr1] = await ethers.getSigners();

        const ErikGame = await ethers.getContractFactory(CONTRACT_NAME);
        const hardhatErikGame = await ErikGame.deploy();
        await hardhatErikGame.waitForDeployment();

        // Check event emission for getTokenOne
        await expect(hardhatErikGame.connect(addr1).getTokenOne())
            .to.emit(hardhatErikGame, "TokenEvent")
            .withArgs(addr1.address, "1");

        // Check event emission for getTokenTwo
        await expect(hardhatErikGame.connect(addr1).getTokenTwo())
            .to.emit(hardhatErikGame, "TokenEvent")
            .withArgs(addr1.address, "2");
    });
});
