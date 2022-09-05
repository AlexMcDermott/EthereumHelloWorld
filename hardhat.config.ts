import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: `${process.env.ALCHEMY_APP_URL}${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
  },
};

export default config;
