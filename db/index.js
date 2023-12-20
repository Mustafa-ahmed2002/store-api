const { Client } = require("pg");
require("dotenv").config();
const client = new Client({
  connectionString: process.env.client,
});
client
  .connect()
  .then(() => console.log("Connected Successfuly"))
  .catch((e) => console.log("error", e));
module.exports = client;
