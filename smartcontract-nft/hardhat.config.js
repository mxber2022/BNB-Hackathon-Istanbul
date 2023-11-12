require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",

  networks: {

    'opbnb-testnet': {
      url: 'https://opbnb-testnet-rpc.bnbchain.org/',
      chainId: 5611,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },

  },

  etherscan: {
    apiKey: {
      "opbnb-testnet": "d35ff4afb2524e8caf117a01e9ff8e3f",
    },

    customChains: [
      {
        network: "opbnb-testnet",
        chainId: 5611,
        urls: {
          apiURL: "https://open-platform.nodereal.io/d35ff4afb2524e8caf117a01e9ff8e3f/op-bnb-testnet/contract/",
          browserURL: '',
        },

      },
    ],

  },
}
