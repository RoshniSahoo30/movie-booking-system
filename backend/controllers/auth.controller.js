const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    
    const payload = {
      user: {
        id: user.id, // Use the user's database ID in the token
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); 
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
