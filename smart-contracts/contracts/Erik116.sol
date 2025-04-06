// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Erik is ERC1155 {
    uint256 public constant SEED = 0;
    uint256 public constant WATER = 1;
    uint256 public constant SOIL = 2;

    // Token FORGE
    uint256 public constant PLANT = 3; // Forged from SEED + WATER
    uint256 public constant FRUIT = 4; // Forged from WATER + SOIL
    uint256 public constant FLOWER = 5; // Forged from SEED + SOIL
    uint256 public constant BASKET = 6; // Forged from SEED + WATER + SOIL

    constructor() ERC1155("https://myapi.com/metadata/{id}.json") {}

    function mint(address to, uint256 id) external {
        if (id == SEED || id == WATER || id == SOIL) {
            _mint(to, id, 1, "");
        } else {
            revert("Invalid token ID");
        }
    }

    function burn(address to, uint256 id) external {
        if (id == PLANT || id == FRUIT || id == FLOWER || id == BASKET) {
            _burn(to, id, 1);
        } else {
            revert("Invalid token ID"); // Fixed typo "Invalid to ken ID"
        }
    }
}

contract ErikForge {
    Erik public token;
    uint256 public constant COOLDOWN = 5 seconds;
    mapping(address => uint256) public lastMintTime; // Track last mint time per user

    constructor(Erik _token) {
        token = _token;
    }

    // Added mint function to call token.mint with cooldown
    function mint(uint256 id) public {
        require(
            block.timestamp >= lastMintTime[msg.sender] + COOLDOWN,
            "Cooldown not elapsed"
        );
        token.mint(msg.sender, id); // Delegate to token
        lastMintTime[msg.sender] = block.timestamp;
    }

    function burn(uint256 id) public {
        require(token.balanceOf(msg.sender, id) > 0, "you dont own this token");
        token.burn(msg.sender, id);
    }

    function trade(uint256 tokenIn, uint256 tokenOut) public {
        require(
            token.balanceOf(msg.sender, tokenIn) > 0,
            "You don't have this token"
        );
        token.burn(msg.sender, tokenIn);
        token.mint(msg.sender, tokenOut);
    }
}
