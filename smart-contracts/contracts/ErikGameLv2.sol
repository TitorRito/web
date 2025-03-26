// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ErikGame.sol";

/*
 ** idea: that token two can only be obtained by owning token one first.
 ** lv1: anyone can get token one, or two, but rules still apply
 ** lv2: token 1 is a token of authorisation that the user must call/allow inside their wallet, to then recieve token 2.
 */

contract ErikGameLv2 is ErikGame {
    mapping(address => bool) public tokenOneAuthorized;

    constructor() ErikGame() {}

    event WelcomeAuthorizationEvent(address indexed user, string message);

    function authorizeTokenOne() public {
        require(
            tokenOneBalance[msg.sender] > 0,
            "You don't have any token one to authorize"
        );
        tokenOneAuthorized[msg.sender] = true;
        emit WelcomeAuthorizationEvent(
            msg.sender,
            "Thank you and welcome! Your address has authorized this contract"
        );
    }

    function getTokenTwo() public override returns (string memory) {
        require(
            tokenOneBalance[msg.sender] > 0,
            "You must have token one to get token two"
        );
        require(
            tokenOneAuthorized[msg.sender],
            "You must authorize your token one first"
        );

        tokenTwoBalance[msg.sender] += 1;
        emit TokenEvent(msg.sender, TWO);

        return TWO;
    }
}
