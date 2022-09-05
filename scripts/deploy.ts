import { ethers } from "hardhat";

async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloworld = await HelloWorld.deploy("Hello World");

  await helloworld.deployed();
  console.log(`Successfully deployed to ${helloworld.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
