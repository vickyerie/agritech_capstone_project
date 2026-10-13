import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "./db/config.js";
import User from "./db/models/User.js";
import Product from "./db/models/Product.js";

dotenv.config();

const products = [
  { name: "Rice Seeds (Ciherang) 1kg", category: "seed", price: 35000, description: "High-yield rice variety suited to lowland paddies." },
  { name: "Hybrid Maize Seeds 1kg", category: "seed", price: 60000, description: "Hybrid maize seeds with strong disease resistance." },
  { name: "Urea Fertilizer 5kg", category: "fertilizer", price: 45000, description: "Nitrogen-rich fertilizer for leaf and stem growth." },
  { name: "NPK Fertilizer 5kg", category: "fertilizer", price: 75000, description: "Balanced NPK blend for general crop nutrition." },
  { name: "Organic Compost 10kg", category: "fertilizer", price: 40000, description: "Composted organic matter to improve soil structure." },
  { name: "Insecticide (Chlorpyrifos) 500ml", category: "pesticide", price: 85000, description: "Broad-spectrum insecticide for common crop pests." },
  { name: "Fungicide (Mancozeb) 500g", category: "pesticide", price: 70000, description: "Protective fungicide against blight and leaf spot." },
  { name: "Hand Sprayer 16L", category: "equipment", price: 250000, description: "Manual backpack sprayer for pesticide and fertilizer." },
  { name: "Soil Moisture Sensor", category: "equipment", price: 150000, description: "Probe for checking soil moisture before irrigating." },
];

const run = async () => {
  await connectDB();

  const adminEmail = "admin@agritech.com";
  if (!(await User.findOne({ email: adminEmail }))) {
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });
    console.log("Admin created: admin@agritech.com / admin123");
  }

  if ((await Product.countDocuments()) === 0) {
    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);
  } else {
    console.log("Products already exist, skipped");
  }

  await mongoose.disconnect();
};

run();
