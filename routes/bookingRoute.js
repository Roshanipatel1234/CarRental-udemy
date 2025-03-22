const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/Car");
const stripe = require("stripe")("sk_test_51QxVJGEEoAGOCxksucFXGSqRtXbuG0rEgJF8eZUoO8RHWjQ0mXBITEYX7xV6NEJWYkfFZPfab8SoWcUFT0I7O4tp009If5cfnF");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose"); 

router.post("/bookcar", async (req, res) => {
    const { token } = req.body;

    try {
        // ✅ Use stripe.customers.create() instead of stripe.customer()
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        // ✅ Use customer.id for the payment charge
        const payment = await stripe.charges.create({
            amount: req.body.totalAmount * 100, // Convert to paisa
            currency: 'INR',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4() // Ensure idempotency
        });

        if (payment) {
            req.body.transactionId=payment.source.id
            const newBooking = new Booking(req.body);
            await newBooking.save();

            const car = await Car.findOne({ _id: req.body.car });
            console.log(req.body.car);

            car.bookedTimeSlots.push(req.body.bookedTimeSlots);
            await car.save();

            res.send('Your booking is successful.');
        } else {
            return res.status(400).json({ message: "Payment failed." });
        }
    } catch (error) {
        console.error("❌ Booking Error:", error);
        return res.status(400).json(error);
    }
});

router.get("/getallbookings",async(req, res)=>{
try{
    const bookings=await Booking.find().populate('car')
    res.send(bookings)

}catch(error){
 return res.status(400).json(error);
}
});


module.exports = router;
