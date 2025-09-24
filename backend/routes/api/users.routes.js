const express = require("express");
const router = express.Router();
const { createUser } = require("../../controllers/user.controller");

// This route will respond to POST requests
router.post("/", createUser);

module.exports = router;
