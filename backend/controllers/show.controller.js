const Show = require("../models/Show.model");
const Screen = require("../models/Screen.model");

exports.getAllShows = async (req, res) => {
  try {
    
    const shows = await Show.find().populate("movie").populate("screen");
    res.json(shows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getShowsByCinema = async (req, res) => {
  try {
    const cinemaId = req.params.cinemaId;
    console.log(`1. Fetching shows for cinema ID: ${cinemaId}`);

   
    const screens = await Screen.find({ cinema: cinemaId });
    console.log("2. Found screens:", screens); // <-- Let's see if this finds anything

    const screenIds = screens.map((screen) => screen._id);
    console.log("3. Extracted Screen IDs:", screenIds);

    if (screenIds.length === 0) {
      console.log("No screens found for this cinema, returning empty array.");
      return res.json([]);
    }

    
    const shows = await Show.find({ screen: { $in: screenIds } }).populate(
      "movie"
    );
    console.log("4. Found shows:", shows);

    res.json(shows);
  } catch (err) {
    console.error("Error in getShowsByCinema:", err.message);
    res.status(500).send("Server Error");
  }
};



exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate('movie')
      .populate({
        path: 'screen',
        populate: {
          path: 'cinema'
        }
      });
    if (!show) {
      return res.status(404).json({ msg: 'Show not found' });
    }
    res.json(show);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// 68d2c5d6123a2e3e2e5665e2
// 68d2c9e6123a2e3e2e5665e4