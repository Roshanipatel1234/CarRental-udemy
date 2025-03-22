const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    bookedTimeSlots: {
        from: { type: String },
        to: { type: String }
    },
    totalAmount: { type: Number, required: true },
    driverRequired: { type: Boolean, default: false },
    transactionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
