const User = require("../models/User.model");

exports.createUser = async (req, res) => {
  // Get the name, email, and password from the request body
  const { name, email, password } = req.body;

  try {
    // Check if a user with this email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password, // Note: In a real app, you would hash this password!
    });

    // Save the user to the database
    await user.save();

    // Send back the new user's data
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
