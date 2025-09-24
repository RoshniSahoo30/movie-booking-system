const express = require("express");
const router = express.Router();
const { getAllShows } = require("../../controllers/show.controller");

router.get("/", getAllShows);

module.exports = router;
