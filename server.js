const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db'); // Connect to MongoDB
const Car = require('./models/Car'); // Import Car model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Get All Cars
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        console.log("Fetched Cars:", cars); // Debugging
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// ✅ Add New Car
app.post('/api/cars', async (req, res) => {
    try {
        console.log("🚗 Received Data:", req.body); // Debugging

        if (!req.body.name || !req.body.image || !req.body.rentPerHour) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newCar = new Car(req.body);
        await newCar.save();

        console.log("✅ Car Saved in DB:", newCar);
        res.status(201).json(newCar);
    } catch (error) {
        console.error("❌ Error adding car:", error);
        res.status(500).json({ message: 'Failed to add car', error });
    }
});

// ✅ Edit Car by ID
app.put('/api/cars/:id', async (req, res) => {
    try {
        const { name, image, rentPerHour, capacity, fuelType } = req.body;
        
        if (!name || !image || !rentPerHour || !capacity || !fuelType) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ success: true, message: "🚗 Car updated successfully", car: updatedCar });

    } catch (error) {
        console.error("❌ Error updating car:", error);
        res.status(500).json({ message: "Failed to update car", error });
    }
});


// ✅ Delete Car by ID
app.delete('/api/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: '✅ Car deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: '❌ Error deleting car', error });
    }
});


// ✅ User & Booking Routes
const userRoutes = require("./routes/usersRoute");
app.use("/api/users", userRoutes);  
app.use("/api/bookings", require("./routes/bookingRoute"));



// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
