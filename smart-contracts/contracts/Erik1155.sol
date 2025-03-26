// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Erik1155 is ERC1155{

    uint256 public constant COOLDOWN = 5 seconds;
    mapping(address => uint256) public lastMintTime; // Track last mint time per user

    // Token EASY MINT
    uint256 public constant SEED = 0;
    uint256 public constant WATER = 1;
    uint256 public constant SOIL = 2;
    
    // Token FORGE
    uint256 public constant PLANT = 3; // Forged from SEED + WATER
    uint256 public constant FRUIT = 4; // Forged from WATER + SOIL
    uint256 public constant FLOWER = 5; // Forged from SEED + SOIL
    uint256 public constant BASKET = 6; // Forged from SEED + WATER + SOIL


    // Constructor with a metadata URI (update this as needed)
    constructor() ERC1155("https://myapi.com/metadata/{id}.json") {}

    // Mint basic tokens (0-2) with cooldown
    function mintBasicToken(uint256 id) public {
        require(id <= 2, "Invalid basic token ID");
        require(
            block.timestamp >= lastMintTime[msg.sender] + COOLDOWN,
            "Wait for cooldown"
        );

        _mint(msg.sender, id, 1, "");
        lastMintTime[msg.sender] = block.timestamp;
    }

    // Forge tokens 3-6 by burning combos of 0-2
    function forgeToken(uint256 toId) public {
        if (toId == PLANT) {
            require(
                balanceOf(msg.sender, SEED) >= 1 &&
                    balanceOf(msg.sender, WATER) >= 1,
                "Need Seed and Water"
            );
            _burn(msg.sender, SEED, 1);
            _burn(msg.sender, WATER, 1);
        } else if (toId == FRUIT) {
            require(
                balanceOf(msg.sender, WATER) >= 1 &&
                    balanceOf(msg.sender, SOIL) >= 1,
                "Need Water and Soil"
            );
            _burn(msg.sender, WATER, 1);
            _burn(msg.sender, SOIL, 1);
        } else if (toId == FLOWER) {
            require(
                balanceOf(msg.sender, SEED) >= 1 &&
                    balanceOf(msg.sender, SOIL) >= 1,
                "Need Seed and Soil"
            );
            _burn(msg.sender, SEED, 1);
            _burn(msg.sender, SOIL, 1);
        } else if (toId == BASKET) {
            require(
                balanceOf(msg.sender, SEED) >= 1 &&
                    balanceOf(msg.sender, WATER) >= 1 &&
                    balanceOf(msg.sender, SOIL) >= 1,
                "Need all three"
            );
            _burn(msg.sender, SEED, 1);
            _burn(msg.sender, WATER, 1);
            _burn(msg.sender, SOIL, 1);
        } else {
            revert("Invalid forge ID");
        }
        _mint(msg.sender, toId, 1, "");
    }

    // Burn tokens 3-6 (get nothing back)
    function burnToken(uint256 id) public {
        require(id >= 3 && id <= 6, "Can only burn tokens 3-6");
        require(balanceOf(msg.sender, id) >= 1, "Not enough tokens");
        
        _burn(msg.sender, id, 1);
        // Nothing is returned when burning these tokens
    }
    
    // Trade any token for a basic token (0-2)
    function tradeForBasic(uint256 tokenId, uint256 basicTokenId) public {
        require(basicTokenId <= 2, "Can only trade for basic tokens 0-2");
        require(balanceOf(msg.sender, tokenId) >= 1, "Not enough tokens to trade");
        
        _burn(msg.sender, tokenId, 1);
        _mint(msg.sender, basicTokenId, 1, "");
    }

    // Check time left until next mint
    function timeUntilNextMint(address user) public view returns (uint256) {
        uint256 nextMint = lastMintTime[user] + COOLDOWN;
        if (block.timestamp >= nextMint) return 0;
        return nextMint - block.timestamp;
    }
}
