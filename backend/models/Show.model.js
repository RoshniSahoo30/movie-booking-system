const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowSchema = new Schema({
  // Reference to the Movie document
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  // Reference to the Screen document
  screen: {
    type: Schema.Types.ObjectId,
    ref: 'Screen',
    required: true,
  },
  // The specific date and time of the show
  startTime: {
    type: Date,
    required: true,
  },
//   [cite_start]// An array to hold the seat numbers that have been booked [cite: 16]
  bookedSeats: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('Show', ShowSchema);