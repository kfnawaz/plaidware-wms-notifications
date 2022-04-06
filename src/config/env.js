require("dotenv").config();

const envVariables = {
  API_PORT: process.env.API_PORT || "3000"
};

module.exports = envVariables;
