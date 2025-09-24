const express = require("express");
const router = express.Router();
const { getAllShows, getShowsByCinema } = require("../../controllers/show.controller");

router.get("/", getAllShows);

router.get('/cinema/:cinemaId', getShowsByCinema);

module.exports = router;
