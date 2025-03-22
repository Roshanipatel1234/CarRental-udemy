const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  rentPerHour: { type: Number, required: true },
  capacity: { type: Number, required: true },
  fuelType: { type: String, required: true },
  bookedTimeSlots: { type: Array, default: [] },
}, { timestamps: true });

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
