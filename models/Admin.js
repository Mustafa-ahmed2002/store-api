const client = require("../db");

async function adminsRegister(req, res) {
  let { username, password } = req.body;
  const results = await client.query(
    `insert into admins (username,password) values('${username}','${password}') returning *`
  );
  res.send(results.rows);
}
async function adminsLogin(req, res) {
  let { username, password } = req.body;
  const results = await client.query(
    `select * from admins where username='${username}' AND password = '${password} returning *'`
  );
  res.send({ success: true });
}
async function viewProducts(req, res) {
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
async function addProducts(req, res) {
  let { name, price, discount, image, active } = req.body;
  const results = await client.query(
    `insert into products (name,price,discount,image,active) values('${name}','${price}','${discount}','${image}','${active}') returning *  `
  );
  res.send(results.rows);
}
async function updateProducts(req, res) {
  let id = req.params.id;
  let { name, price, discount, image, active } = req.body;
  const results = await client.query(
    `update products set name='${name}',price='${price}',discount='${discount}',image='${image}',active='${active}' where id = '${id}' returning * `
  );
  res.send(results.rows);
}
async function deleteProducts(req, res) {
  let id = req.params.id;
  const results = await client.query(
    `delete from products where id = '${id}' returning *`
  );
  res.send({ sucess: true, msg: "the product has been deleted" });
}
async function viewOrders(req, res) {
  const results = await client.query(`select * from orders `);
  res.send(results.rows);
}
async function changeOrders(req, res) {
  let id = req.params.id;
  let { items, userId, address, date, status } = req.body;
  const results = await client.query(
    `update orders set items='${items}',userId='${userId}',address='${address}',date='${date}',status='${status}' where id = '${id}' returning * `
  );
  res.send(results.rows);
}
module.exports = {
  adminsRegister,
  adminsLogin,
  viewProducts,
  addProducts,
  updateProducts,
  deleteProducts,
  viewOrders,
  changeOrders,
};
