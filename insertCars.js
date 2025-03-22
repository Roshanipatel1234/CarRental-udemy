const mongoose = require("mongoose");
require("dotenv").config();
require("./db"); // Ensure MongoDB connection

const Car = require("./models/car"); // Import the Car model

async function insertCars() {
  const cars = [
    {
      name: "Tata Altroz",
      image: "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/182723/altroz-right-front-three-quarter-2.jpeg?isig=0&q=80",
      rentPerHour: 500,
      fuelType: "Petrol",
      bookedTimeSlots: [],
      capacity: 5,
    },
    {
      name: "Mahindra XUV700",
      image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Scorpio/10764/1708522826716/front-left-side-47.jpg?tr=w-300",
      rentPerHour: 500,
      fuelType: "Petrol",
      bookedTimeSlots: [],
      capacity: 5,
    },
    {
      name: "Tata Nexon",
      image: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon/11103/1736494813808/front-left-side-47.jpg",
      rentPerHour: 500,
      fuelType: "Petrol",
      bookedTimeSlots: [],
      capacity: 5,
    },
    {
      name: "Hyundai i20",
      image: "https://th.bing.com/th/id/OIP.7nq8Wb4RjNy0y8fWtVNQgwHaD9?rs=1&pid=ImgDetMain",
      rentPerHour: 500,
      fuelType: "Petrol",
      bookedTimeSlots: [],
      capacity: 5,
    },
    {
      name: "MG Astor",
      image: "https://images.firstpost.com/wp-content/uploads/2021/09/mg-astor-unveiled-for-india-adas-features-ai-powered-assistant-petrol-engines-only.jpg?im=FitAndFill=(596,336)",
      rentPerHour: 500,
      fuelType: "Petrol",
      bookedTimeSlots: [],
      capacity: 5,
    },
    {
      name: "Maruti Suzuki Baleno",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW869Z7gSxIe2AhHsZ1Mmq06Lbom8l7Ugfew&s",
      rentPerHour: 400,
      fuelType: "Petrol",
      bookedTimeSlots: [],
      capacity: 5,
    },
    {
      name: "Kia Seltos",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3vP-YroyD7Zf2hRdhsPL2E9yK_EgWwGg50Q&s",
      rentPerHour: 600,
      fuelType: "Diesel",
      bookedTimeSlots: [],
      capacity: 5,
    },
    {
      name: "Honda City",
      image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/City/9421/1739862184352/front-left-side-47.jpg?imwidth=420&impolicy=resize",
      rentPerHour: 650,
      fuelType: "Petrol",
      bookedTimeSlots: [],
      capacity: 5,
    },
  ];

  try {
    await Car.deleteMany({}); // Clear existing cars
    await Car.insertMany(cars); // Insert new cars
    console.log("✅ 8 Cars added to the database");
  } catch (error) {
    console.error("❌ Error inserting cars:", error);
  } finally {
    await mongoose.disconnect(); // Properly close the connection
  }
}

// Call the function
insertCars();
