const express = require("express");
const router = express.Router();
const { getAllShows, getShowsByCinema, getShowById } = require("../../controllers/show.controller");

router.get("/", getAllShows);

router.get('/cinema/:cinemaId', getShowsByCinema);

router.get("/:showId", getShowById);

module.exports = router;
