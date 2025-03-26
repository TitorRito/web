// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
 ** idea: that token two can only be obtained by owning token one first.
 ** lv1: anyone can get token one, or two, but rules still apply
 ** lv2: token 1 is a token of authorisation that the user must call/allow inside their wallet, to then recieve token 2.
 */

contract ErikGame {
    address public _auth;
    string public name = "Game of Twinkles";
    string public constant ONE = "1";
    string public constant TWO = "2";

    mapping(address => uint256) public tokenOneBalance;
    mapping(address => uint256) public tokenTwoBalance;

    constructor() {
        _auth = msg.sender;
    }

    event TokenEvent(address indexed user, string token);

    function getTokenOne() public returns (string memory) {
        require(tokenOneBalance[msg.sender] == 0, "You already have token one");
        tokenOneBalance[msg.sender] += 1;
        emit TokenEvent(msg.sender, ONE);

        return ONE;
    }

    function getTokenTwo() public virtual returns (string memory) {
        require(
            tokenOneBalance[msg.sender] > 0,
            "You must have token one to get token two"
        );
        require(tokenTwoBalance[msg.sender] == 0, "You already have token two");
        tokenTwoBalance[msg.sender] += 1;
        emit TokenEvent(msg.sender, TWO);

        return TWO;
    }

    function getStatus() public view returns (uint256, uint256) {
        return (tokenOneBalance[msg.sender], tokenTwoBalance[msg.sender]);
    }
}
