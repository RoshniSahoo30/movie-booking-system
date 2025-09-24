const Booking = require("../models/Booking.model");
const Show = require("../models/Show.model");


exports.createBooking = async (req, res) => {
  
  const { user, show, seats } = req.body;

  try {
    
    const newBooking = new Booking({
      user,
      show,
      seats,
    });
    const booking = await newBooking.save();

    
    await Show.updateOne(
      { _id: show },
      { $push: { bookedSeats: { $each: seats } } }
    );

    res.status(201).json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getBookingsForUser = async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.params.userId })
        .populate({
          path: 'show',
          populate: {
            path: 'movie screen',
          },
        });
        
      if (!bookings) {
        return res.json([]); 
      }
  
      res.json(bookings);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };