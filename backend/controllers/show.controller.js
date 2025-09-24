const Show = require("../models/Show.model");

exports.getAllShows = async (req, res) => {
  try {
    // We can chain .populate() to get details for both movie and screen
    const shows = await Show.find().populate("movie").populate("screen");
    res.json(shows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
