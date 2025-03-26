// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erik20 is ERC20 {
    uint256 public myVariable;

    constructor() ERC20("ErikToken", "ERIK") {
        myVariable = 5;
        _mint(msg.sender, 1000 * 10 ** decimals()); // Mint initial supply to the deployer
    }
}