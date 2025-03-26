// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
 ** idea: that token two can only be obtained by owning token one first.
 ** lv1: anyone can get token one, or two, but rules still apply
 ** lv2: token 1 is a token of authorisation that the user must call/allow inside their wallet, to then recieve token 2.
 */

contract ErikGameLv2 {
    address public _auth;
    string public name = "Game of Twinkles";
    string public constant ONE = "1";
    string public constant TWO = "2";

    mapping(address => uint256) public tokenOneBalance;
    mapping(address => uint256) public tokenTwoBalance;
    
    // Add mapping for token one authorization
    mapping(address => bool) public tokenOneAuthorized;

    constructor() {
        _auth = msg.sender;
    }

    event TokenEvent(address indexed user, string token);

    function getTokenOne() public returns (string memory) {
        tokenOneBalance[msg.sender] += 1;
        emit TokenEvent(msg.sender, ONE);

        return ONE;
    }
    
    // Add function to authorize token one usage
    function authorizeTokenOne() public {
        require(tokenOneBalance[msg.sender] > 0, "You don't have any token one to authorize");
        tokenOneAuthorized[msg.sender] = true;
        emit TokenEvent(msg.sender, "Authorization");
    }

    // Add modifier for token one authorization check
    modifier onlyAuthorized() {
        require(tokenOneBalance[msg.sender] > 0, "You must have token one to get token two");
        require(tokenOneAuthorized[msg.sender], "You must authorize your token one first");
        _;
    }

    function getTokenTwo() public onlyAuthorized returns (string memory) {
        tokenTwoBalance[msg.sender] += 1;
        emit TokenEvent(msg.sender, TWO);

        return TWO;
    }

    function getStatus() public view returns (uint256, uint256) {
        return (tokenOneBalance[msg.sender], tokenTwoBalance[msg.sender]);
    }
    
}
