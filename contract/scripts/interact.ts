import { ethers } from "hardhat";
import * as contract from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const alchemyProvider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(
    process.env.METAMASK_PRIVATE_KEY!,
    alchemyProvider
  );

  const helloWorldContract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS!,
    contract.abi,
    signer
  );

  const message = await helloWorldContract.message();
  console.log("Current message is: " + message);

  const messageTx = "almost Grill'd time";
  console.log(`Changing the message to: ${messageTx}`);
  await (await helloWorldContract.update(messageTx)).wait();

  const messageRx = await helloWorldContract.message();
  console.log(`The message is now: ${messageRx}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
