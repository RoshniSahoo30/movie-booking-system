const Show = require("../models/Show.model");

exports.getAllShows = async (req, res) => {
  try {

    const shows = await Show.find().populate("movie").populate("screen");
    res.json(shows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
