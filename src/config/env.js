require("dotenv").config();

const envVariables = {
  API_PORT: process.env.API_PORT || "9001"
};

module.exports = envVariables;
