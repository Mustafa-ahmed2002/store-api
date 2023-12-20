const express = require("express");
const router = express.Router();
const a = require("../models/User");
router.get("/products/view", a.usersViewProducts);
router.post("/orders/add/", a.usersAddOrders);
router.post("/register", a.usersRegister);
router.post("/login", a.usersLogin);
module.exports = router;
