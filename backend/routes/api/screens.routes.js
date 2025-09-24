const express = require("express");
const router = express.Router();
const { getAllScreens } = require("../../controllers/screen.controller");

router.get("/", getAllScreens);

module.exports = router;
