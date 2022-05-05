require("@nomiclabs/hardhat-waffle");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  solidity: {
    version: "0.8.0",
  },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.API_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
};
