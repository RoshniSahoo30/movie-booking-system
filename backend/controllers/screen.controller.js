const Screen = require("../models/Screen.model");

exports.getAllScreens = async (req, res) => {
  try {
   
    const screens = await Screen.find().populate("cinema");
    res.json(screens);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
