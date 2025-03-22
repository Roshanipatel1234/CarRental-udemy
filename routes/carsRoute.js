const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/Car");


// ✅ Book a Car API
router.post("/bookcar", async (req, res) => {
  try {
    // ✅ Generate a unique transaction ID (using UUID)
    req.body.transactionId = uuidv4();

    // ✅ Fetch the car details
    const car = await Car.findById(req.body.car);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    // ✅ Check if the car is already booked for the given time slot
    const existingBooking = await Booking.find({
      car: req.body.car,
      $or: [
        { 'bookedTimeSlots.from': { $lte: req.body.bookedTimeSlots.to }, 'bookedTimeSlots.to': { $gte: req.body.bookedTimeSlots.from } }
      ]
    });

    if (existingBooking.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Car already booked for this time slot."
      });
    }

    // ✅ Create a new booking
    const newBooking = new Booking(req.body);

    // ✅ Save the booking in MongoDB
    await newBooking.save();

    // ✅ Send success response
    res.status(201).json({
      success: true,
      message: "🚗 Car booked successfully",
      booking: newBooking
    });

  } catch (error) {
    console.error("❌ Error booking the car:", error);

    // ✅ Send error response
    res.status(500).json({
      success: false,
      message: "Failed to book the car",
      error: error.message
    });
  }
});


// ✅ Get All Bookings API
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car').populate('user');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
});


// ✅ Cancel Booking API
router.delete("/cancelbooking/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // ✅ Delete the booking
    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "🚗 Booking canceled successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
      error: error.message
    });
  }
});

router.post("/addcar", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ success: true, message: "🚗 Car added successfully", car: newCar });
  } catch (error) {
    console.error("❌ Error adding car:", error);
    res.status(400).json({ success: false, message: "Failed to add car", error: error.message });
  }
});

router.put('/api/cars/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: "Failed to update car", error });
    }
});

router.delete("/deletecar/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.send("Car deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});


module.exports = router;
