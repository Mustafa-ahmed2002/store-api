const express = require("express");
const app = express();
const port = 3005;
const admins = require("./routers/admins");
const users = require("./routers/users");
app.use(express.json());

app.get("/hi", (req, res) => {
  res.send("hello");
});
app.use("/api/v1/admins", admins);
app.use("/api/v1/users", users);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
