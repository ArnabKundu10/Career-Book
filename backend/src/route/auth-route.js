const express = require("express");
const route = new express.Router();
const authcontroller = require("../controllers/auth-controller");
route.get("/", authcontroller.home);
route.post("/register", authcontroller.register);
route.post("/login", authcontroller.login);
module.exports = route;
