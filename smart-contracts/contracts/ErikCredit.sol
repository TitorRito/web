// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTGatedCredit is Ownable {
    IERC721 public nft; // Token 1 is now an NFT (ERC-721)
    IERC20 public creditToken; // Token 2 is the credit (ERC-20)

    event CreditIssued(address recipient, uint256 amount);

    constructor(
        address _nftAddress,
        address _creditTokenAddress,
        address initialOwner
    ) Ownable(initialOwner) {
        nft = IERC721(_nftAddress);
        creditToken = IERC20(_creditTokenAddress);
    }

    modifier onlyNFTHolders() {
        require(nft.balanceOf(msg.sender) > 0, "Not an NFT holder");
        _;
    }

    // Users call this to request credit (Token 2)
    function requestCredit(uint256 _amount) external onlyNFTHolders {
        require(_amount > 0, "Amount must be greater than 0");

        // Transfer the credit tokens
        creditToken.transfer(msg.sender, _amount);
        emit CreditIssued(msg.sender, _amount);
    }

    // Fallback function to receive ETH
    receive() external payable {}
}
