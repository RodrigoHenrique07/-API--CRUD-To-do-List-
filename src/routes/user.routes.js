const express = require("express");

const UserController = require("../Controllers/user.controller");

const routerUser = express.Router();

routerUser.post("/", async (req, res) => {
    return new UserController(req, res).createUser();
});

routerUser.get("/", async (req, res) => {
    return new UserController(req, res).getAllUsers();
});

routerUser.get("/:id", async (req, res) => {
    return new UserController(req, res).getUserById();
});

routerUser.delete("/:id", async (req, res) => {
    return new UserController(req, res).deleteUser();
});

routerUser.patch("/:id", async (req, res) => {
    return new UserController(req, res).updateUser();
});

routerUser.post("/login", async (req, res) => {
    return new UserController(req, res).login();
});

module.exports = routerUser;
