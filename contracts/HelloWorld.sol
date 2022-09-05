// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HelloWorld {
   event MessageUpdated(string oldStr, string newStr);
   
   string public message;
   constructor(string memory initMessage) {
      message = initMessage;
   }

   function update(string memory newStr) public {
      string memory oldStr = newStr;
      message = newStr;
      emit MessageUpdated(oldStr, newStr);
   }
}
