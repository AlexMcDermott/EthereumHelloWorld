// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HelloWorld {
    event MessageUpdated(string message);

    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function update(string memory newMessage) public {
        message = newMessage;
        emit MessageUpdated(message);
    }
}
