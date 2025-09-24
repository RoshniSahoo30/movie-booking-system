const Movie = require("../models/Movie.model");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

