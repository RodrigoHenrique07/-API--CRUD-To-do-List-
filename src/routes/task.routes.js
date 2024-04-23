const express = require("express");

const TaskController = require("../Controllers/task.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).created();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).delete();
});

module.exports = router;
