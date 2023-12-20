const client = require("../db");
async function usersViewProducts(req, res) {
  let search = req.query.search || "";
  const skip = req.query.skip || 1;
  const limit = req.query.limit || 10;
  const offset = (skip - 1) * limit;
  const results = await client.query(`select * from products 
    where name ilike '%${search}%' 
    order by name asc
    limit ${limit} offset ${offset}  `);
  res.send(results.rows);
}
async function usersAddOrders(req, res) {
  let { items, userID, address, date, status } = req.body;
  const results = await client.query(
    `insert into orders (items,userID,address,date,status) values('${items}','${userID}','${address}','${date}','${status}')  returning *  `
  );
  res.send(results.rows);
}
async function usersRegister(req, res) {
  let { username, password } = req.body;
  const results = await client.query(
    `insert into users (username,password) values('${username}','${password}') returning *`
  );
  res.send(results.rows);
}
async function usersLogin(req, res) {
  let { username, password } = req.body;
  const results = await client.query(
    `select * from users where username='${username}' AND password = '${password} returning *'`
  );
  res.send({ success: true });
}
module.exports = {
  usersViewProducts,
  usersAddOrders,
  usersRegister,
  usersLogin,
};
