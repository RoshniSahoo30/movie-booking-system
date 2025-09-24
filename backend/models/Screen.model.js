const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScreenSchema = new Schema({
  screenNumber: {
    type: Number,
    required: true,
  },
  
  cinema: {
    type: Schema.Types.ObjectId, 
    ref: "Cinema", 
    required: true,
  },
});

module.exports = mongoose.model("Screen", ScreenSchema);
