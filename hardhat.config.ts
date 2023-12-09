import * as dotenv from "dotenv";

import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts:
        process.env.SEPOLIA_PRIVATE_KEY !== undefined ? [process.env.SEPOLIA_PRIVATE_KEY] : [],
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0"
      },
      chainId: 42220
    },
    scrollTestnet: {
      url: process.env.SCROLL_TESTNET_URL || "",
      accounts:
        process.env.SCROLL_PRIVATE_KEY !== undefined ? [process.env.SCROLL_PRIVATE_KEY] : [],
    },
    arbitrumGoerli: {
      url: process.env.ARBITRUM_GOERLI_URL || "",
      accounts:
        process.env.ARB_GOERLI_PRIVATE_KEY !== undefined ? [process.env.ARB_GOERLI_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY ?? "",
      sepolia: process.env.ETHERSCAN_API_KEY ?? "",
      celo: process.env.CELOSCAN_API_KEY ?? ""
    },
    customChains: [
      {
          network: "celo",
          chainId: 42220,
          urls: {
              apiURL: "https://api.celoscan.io/api",
              browserURL: "https://celoscan.io/",
          },
      },
  ]
  },
};

export default config;
