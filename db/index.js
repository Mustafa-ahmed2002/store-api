const { Client } = require("pg");
require("dotenv").config();
const pgp = require("pg-promise")();

const connectionString = process.env.client || "fallback-connection-string";
const db = pgp(connectionString);
const client = new Client({
  connectionString,
});
client
  .connect()
  .then(() => console.log("Connected Successfuly"))
  .catch((e) => console.log("error", e));
module.exports = client;
