const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// ✅ User Registration Route
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("📩 Received Registration Request:", req.body); // ✅ Debugging log

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        console.log("✅ User Registered:", newUser);
        res.status(201).json({ message: "Registration successful! Please log in." });
    } catch (error) {
        console.error("❌ Error in /register:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("📩 Received Login Request:", req.body); // ✅ Debugging log

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("✅ Login Successful:", user);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("❌ Error in /login:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
