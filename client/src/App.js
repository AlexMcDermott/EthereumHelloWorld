import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [contractBalance, setContractBalance] = useState(-1);
  const [currentMessage, setCurrentMessage] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");

  const contractAddress = "0x60D1b97baC636d663eD2e133A2E9604b9c1464eC";
  const contractABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "initMessage",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "MessageUpdated",
      type: "event",
    },
    {
      inputs: [],
      name: "message",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "newMessage",
          type: "string",
        },
      ],
      name: "update",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const getCurrentMessage = async () => {
    setCurrentMessage(await contract.message());
  };

  const handleMessageChange = (e) => {
    setUpdatedMessage(e.target.value);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setCurrentMessage("");
    await contract.update(updatedMessage);
    setUpdatedMessage("");
  };

  contract.on("MessageUpdated", (newMessage) => {
    setCurrentMessage(newMessage);
  });

  useEffect(() => {
    const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
    };

    const getAccountBalance = async (account) => {
      const balance = await provider.getBalance(account);
      setContractBalance(ethers.utils.formatEther(balance));
    };

    requestAccounts().catch(console.error);
    getAccountBalance(contractAddress).catch(console.error);
    getCurrentMessage().catch(console.error);
  });

  return (
    <div className="App">
      <h1>Hello World</h1>
      <h2>Contract balance: {contractBalance}</h2>
      <h3>Current message: {currentMessage}</h3>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          onChange={handleMessageChange}
          value={updatedMessage}
        />
        <button type="submit">Update Message</button>
      </form>
    </div>
  );
}

export default App;
