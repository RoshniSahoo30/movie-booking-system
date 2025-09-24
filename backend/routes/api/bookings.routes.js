const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookingsForUser,
} = require("../../controllers/booking.controller");

router.post("/", createBooking);


router.get("/user/:userId", getBookingsForUser);

module.exports = router;
